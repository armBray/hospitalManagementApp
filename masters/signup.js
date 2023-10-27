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
        res.send('after sign up');
        // var token = randomToken(8);
        // db.verify(username,email,token);

        // db.getuserid(email, (err,res) => {
        //     var id = result[0].id;
        //     var output = `<p>Dear ${username},</p>
        //     <p>Thanks for sign up. Your verification id and token is given below:</p>
        //     <ul>
        //     <li>User ID: ${id}</li>
        //     <li>Token: ${token}</li>
        //     </ul>
        //     <p>verify link: <a href="http://localhost:3000/verify">Verify</a></p>
        //     <p><b>This is automatically generated mail</b></p>
        //     `;

        //     // TO SEND EMAIL - IMPLEMENTATION NOT FINISHED
        //     // var transporter = nodemailer.createTransport({
        //     //     host: "smtp.gmail.com",
        //     //     port: 465,
        //     //     secure: true,
        //     //     auth: {
        //     //         user: "armandosaxam@gmail.com"
        //     //     }
        //     // })

        //     res.send("check your email for token to verify!");
        // });
    })

    module.exports = router;