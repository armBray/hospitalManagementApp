var express             = require('express')
var bodyParser          = require('body-parser')
var mysql               = require('mysql')
var session             = require('express-session')
var sweetalert          = require('sweetalert2')
const {check, validationResult} = require('express-validator')

var db                  = require.main.require('./models/db_master')
var dbcon = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   'root',
    database:   'HospitalManagementApp'
})

var router = express.Router()
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.send('inside login');
    // res.render('login.ejs');
});

router.post('/', [
    check('username').notEmpty().withMessage('username is required'),
    check('password').notEmpty().withMessage('password is required')
    ], (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        console.log(errors);
        console.log(errors.isEmpty());
        if (!errors.isEmpty()) {
            return res.status(422).json({errors:errors.array()})
        }
        
        var username = req.body.username;
        var psw = req.body.password;
        
        if(username&&psw){            
            // var query = 'SELECT * FROM users WHERE username = ? and password = ? ';
            dbcon.query('SELECT * FROM users WHERE username = ? and password = ? ', [username, psw], 
                (err, results, field) => {

                console.log('entro');
                    if(results.length > 0){
                        req.session.loggedin = true;
                        req.session.username = username;
                        res.cookie('username', username);
                        var status = results[0].email_status;
                        if(status=='not_verified'){
                            // res.send('results.length > 0');
                            res.send('please verify your email');
                        } else {
                            sweetalert.fire('logged in!');
                            res.send('sei dentro!');
                        }
                    } else {
                        res.send('username&psw non corretti');  
                    }
                res.end();
                }) 
        } else {
            res.send('please enter your username!');
            res.end();
        }
    })

    module.exports = router;