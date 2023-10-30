var express = require('express');
var router  = express.Router();

var flash   = require('flash'); // to handle HTML flash messages
var bodyParser  = require('body-parser');
var nodemailer  = require('nodemailer');
var randomToken = require('random-token');
var db      = require.main.require('./models/db_master')

// router.get('/', (req, res) => {
//     res.render(reset.ejs) 
// })

module.exports = router;