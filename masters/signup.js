var express             = require('express')
var router = express.Router()
var nodemailer          = require('nodemailer')
var bodyParser          = require('body-parser')
var randomToken         = require('random-token')
var mysql               = require('mysql')
var db                  = require.main.require('./models/db_master')
const {query, validationResult} = require('express-validator')

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json())

router.post('/', [
    query('username').notEmpty().withMessage('username is required'),
    query('password').notEmpty().withMessage('password is required'),
    query('email').notEmpty().withMessage('email is required')
    ], (req, res) => {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({errors:errors.array()})
        // }
        
        var email_status = 'not_verified';
        var email = req.body.email;
        var username = req.body.username;
        var psw = req.body.password;
        // res.send({username, email, psw});
        db.signup(username, email, psw, email_status);
        // console.log('after sign up');
        var token = randomToken(8);
        db.verify(username,email,token);
        // console.log('user added to verify db');
        db.getuserid(email, async (err,result) => {
            var id = result[0].id;
            let testAccount = await nodemailer.createTestAccount();
            var output = `<p>Dear ${username},</p>
            <p>Thanks for sign up. Your verification id and token is given below:</p>
            <ul>
            <li>User ID: ${id}</li>
            <li>Token: ${token}</li>
            </ul>
            <p>verify link: <a href="http://localhost:3001/verify">Verify</a></p>
            <p><b>This is automatically generated mail</b></p>
            `;

            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            let message = {
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Successfully Register with us.", // plain text body
                html: output, // html body
            }
        
        
            transporter.sendMail(message).then((info) => {
                return res.status(201)
                .json({ 
                    msg: "you should receive an email",
                    info : info.messageId,
                    preview: nodemailer.getTestMessageUrl(info)
                })
            }).catch(error => {
                return res.status(500).json({ error })
            })

        });
    })

    module.exports = router;