var mysql       = require('mysql')
var express     = require('express')
var bodyParser  = require('body-parser')

var router      = express.Router()

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

//define findOne from reset.js
module.exports.findOne = function(email, callback){
    var query = 'SELECT * FROM `users` WHERE email = "'+email+'"'
    dbcon.query(query, callback);
    console.log(query);
}

//define temp from reset.js
module.exports.temp = function(id,email,token, callback){
    var query = 'INSERT INTO `temp`(`id`,`email`,`token`) VALUES("'+id+'","'+email+'","'+token+'")'
    dbcon.query(query, callback);
    console.log(query);
}

//define from doctors.js
module.exports.add_doctor = function(first_name, last_name, email, dob, gender, address, phone, image, department, biography, callback){
    var query = 'INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) VALUES("'+first_name+'","'+last_name+'","'+email+'","'+dob+'","'+gender+'","'+address+'","'+phone+'","'+image+'","'+department+'","'+biography+'")'
    dbcon.query(query, callback);
    console.log(query);
}
module.exports.getAllDoc = function(callback){
    var query = 'SELECT * FROM doctor'
    dbcon.query(query, callback)       
}

module.exports.editDoc = function(id, first_name, last_name, email, dob, gender, address, phone, department, biography, callback){
    var query = 'UPDATE `doctor` set `first_name` = "'+first_name+'",`last_name` = "'+last_name+'",`email` = "'+email+'",`dob` = "'+dob+'",`gender` = "'+gender+'",`address` = "'+address+'",`phone` = "'+phone+'",`department` = "'+department+'",`biography` = "'+biography+'" WHERE id = "'+id+'"'
    dbcon.query(query, callback);
    console.log(query);
}
module.exports.getDocbyId = function(id, callback){
    var query = 'SELECT * FROM doctor WHERE id = "'+id+'"'
    dbcon.query(query, callback);
    console.log(query);      
}
module.exports.deleteDoc = function(id, callback){
    var query = 'DELETE FROM doctor WHERE id = "'+id+'"'
    dbcon.query(query, callback);
    console.log(query);      
}
module.exports.searchDoc = function(first_name, callback){
    var query = 'SELECT * FROM doctor WHERE first_name like "%'+first_name+'%"'
    dbcon.query(query, callback);
    console.log(query);      
}