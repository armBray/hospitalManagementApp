var express = require('express');
var flash   = require('flash'); // to handle HTML flash messages
var bodyParser  = require('body-parser');
var nodemailer  = require('nodemailer');
var randomToken = require('random-token');
const { info } = require('console');

var db      = require.main.require('./models/db_master')

var router  = express.Router();
// router.get('/', (req, res) => {
//     res.render(reset.ejs) 
// })

router.post('/', (req, res) => {
    var email = req.body.email;
    db.findOne(email, (err,result) => {
        // console.log(result[0]);
        
        // if result undefined entra
        if(!result[0]){
            console.log('questa email non esiste!');
            res.send("email does not exist");    
        } else {
            var id = result[0].id;
            var email = result[0].email;
            var token = randomToken(8);
            db.temp(id, email, token, async (err, resulttwo) => {
                var output = `<p>Caro Utente,</p>
                <p>Stai ricevendo questa email perchè hai richiesto un reset della password.</p>
                <ul>
                <li>User ID : `+id+`</li>
                <li>Token : `+token+`</li>
                </ul>
                ` 

                let testAccount = await nodemailer.createTestAccount();

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
                    from: '"Fred Foo 👻" <foo@example.com>',
                    to: "bar@example.com, baz@example.com", 
                    subject: "Password reset", 
                    html: output, 
                }
    
                transporter.sendMail(message, (err, info) => {
                    try {
                        console.log(info);
                        res.status(201).json({ 
                            msg: "a token has been sent to your email address",
                            info : info.messageId,
                            preview: nodemailer.getTestMessageUrl(info)
                        })
                        return
                    } catch(err) {
                        console.log(err);
                    }
                })
            })
        }
    }) 
})


module.exports = router;