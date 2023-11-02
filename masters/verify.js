var express = require('express')
var bodyParser  = require('body-parser')

var db      = require.main.require('./models/db_master')

var router  = express.Router()
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json())

// router.get('/', (req, res) => {
//     res.render(verify.ejs) 
// })

router.post('/', (req, res) => {
    var id      = req.body.id;
    var token   = req.body.token;
    db.matchtoken(id, token, (err, result) => {
        console.log(result);
        if (result.length > 0){
            var email = result[0].email;
            var email_status = "verified";
            db.updateverify(email,email_status, (err, result) => {
                res.send("email verified!"); 
            })
        } else {
            res.send("token not match");             
        }
    })

})

module.exports = router;