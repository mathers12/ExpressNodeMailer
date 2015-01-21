var express = require('express');
var partials = require('express-partial');
var router = express.Router();
//NODEMAILER
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',nodemailer: nodemailer, partials: partials});
});

module.exports = router;
