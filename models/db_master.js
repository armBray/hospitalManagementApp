var mysql       = require('mysql')
var express     = require('express')
var router      = express.Router()
var bodyParser  = require('body-parser')

var dbcon = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   'root',
    database:   'HospitalManagementApp'
})

dbcon.connect( e => {
    if(e){
        throw(e)
    }else{
        console.log('you are connected to database');
    }
})

module.exports.signup = function(username, email, password, status, callback){
    dbcon.query('SELECT email FROM users WHERE email = "'+email+'" ',
    (err, res) => {
        console.log(res[0]);
        if(res[0]==undefined){
            var query = 'INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES("'+username+'","'+email+'","'+password+'","'+status+'")';
            dbcon.query(query, callback);
            console.log(query);
        }else{
            console.log(err);
        }
    })
}

module.exports.verify = function(username, email, token, callback){
    var query = 'INSERT INTO `verify`(`username`,`email`,`token`) VALUES("'+username+'","'+email+'","'+token+'")'
    dbcon.query(query, callback)       
}

module.exports.matchtoken = function(id, token, callback){
    var query = 'SELECT * FROM `verify` WHERE token = "'+token+'" and id = "'+id+'"'
    dbcon.query(query, callback)       
}

module.exports.updateverify = function(email, email_status, callback){
    var query = 'UPDATE `users` SET `email_status` = "'+email_status+'" WHERE `email` = "'+email+'"'
    dbcon.query(query, callback)       
}

module.exports.getuserid = function(email, callback){
    var query = 'SELECT * FROM `verify` WHERE email = "'+email+'"'
    dbcon.query(query, callback)       
}