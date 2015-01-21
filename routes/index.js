var express = require('express');
var partials = require('express-partial');
var router = express.Router();
//NODEMAILER
var nodemailer = require("nodemailer");



var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",  // sets automatically host, port and connection security settings
    auth: {
        user: "dsoft.tesla@gmail.com",
        pass: "something001"
    }
});



smtpTransport.sendMail({  //email options
    from: "Sender Name <dsoft.tesla@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
    to: "Receiver Name <michaall.k@gmail.com>", // receiver
    subject: "TELO" , // include header.ejs
    text: "BODY" // include confirmBody.ejs + include footer.ejs
}, function(error, response){  //callback
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',nodemailer: nodemailer, partials: partials});
});

module.exports = router;
