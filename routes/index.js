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
    footer: "Michal Krajnak",
    body: "Cafko, tak trebalo tam dodat atribut fileName a filePath :)"
};

function sendEmail (body)
{

    smtpTransport.sendMail({  //email options
        from: "Michal Krajnak<dsoft.tesla@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
        to: "<gustav.hlavac@gmail.com>", // receiver
        subject: "Header",
        html: body,
        attachments:[

            {
                fileName: "top-shadow-right.gif",
                cid: "top-shadow-right",
                filePath: "public/images/top-shadow-right.gif"
            },
            {

                fileName: "footer-shadow.gif",
                cid: "footer-shadow",
                filePath: "public/images/footer-shadow.gif"

            }
        ]
    }, function(error, response){  //callback
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });


}
/* GET home page */
router.get('/', function (req,res)
{
   res.render('index',dummy_data);
});

/* Send email with a home page in it. */
router.get('/sendmail',function(req,res)
{
   res.render('index',dummy_data,function(err,html)
    {
        sendEmail(html);
        res.redirect('/');
    });
});
module.exports = router;
