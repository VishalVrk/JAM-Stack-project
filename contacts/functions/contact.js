exports.handler =(event, _context ,callback) =>{
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'janelle.kuhic78@ethereal.email',
            pass: '1aE25juaNXdGgxaYCZ'
        }
    });

    const data = JSON.parse(event.body);
    console.log(data);

    let mailOptions = ({
        from: 'janelle.kuhic78@ethereal.email', // sender address
        to: `${data.email}`, // list of receivers
        subject: data.subject, // Subject line
        text: data.body, // plain text body
        html: "<b>Hello world?</b>" // html body
      });

      transporter.sendMail(mailOptions ,(error , info) =>{
        if(error){
            console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      })

    callback(null,{
        statusCode: 200,
        body: JSON.stringify({boop:true})
    });
   
}