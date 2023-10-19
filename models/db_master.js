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

dbcon.connect(function(e){
    if(e){
        throw(e)
    }else{
        console.log('you are connected to database');
    }
})