var express = require('express');
var router = express.Router();
//NODEMAILER
var nodemailer = require("nodemailer");
var partials = require("express-partials");
var app = express();


app.use(partials());



var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",  // sets automatically host, port and connection security settings
    auth: {
        user: "dsoft.tesla@gmail.com",
        pass: "something001"
    }
});

var dummy_data = {
    header: "Header",
    footer: "James Thilla",
    body: "This is body"
};

function sendEmail (body)
{

    smtpTransport.sendMail({  //email options
        from: "Sender Name <dsoft.tesla@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
        to: "Receiver Name <michaall.k@gmail.com>", // receiver
        subject: "Header",
        html: body
    }, function(error, response){  //callback
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });


}
/* GET home page. */
router.get('/', function(req, res, next) {
/*    //HEADER
    res.render('header', { header: dummy_data.header},function(err,html) {
         header = html;
    });

    //BODY
    res.render('confirmBody', { body: dummy_data.body},function(err,html) {
        body = html;
    });

    //FOOTER

    res.render('footer', { footer: dummy_data.footer},function(err,html) {
        footer = html;
    });*/

    //BODY


    //INDEX
    res.render('index', { header: dummy_data.header, body: dummy_data.body,footer: dummy_data.footer},function(err,html)
        {
            body = html;
            sendEmail(body);
            res.send(html);
        }

    );


});

module.exports = router;
