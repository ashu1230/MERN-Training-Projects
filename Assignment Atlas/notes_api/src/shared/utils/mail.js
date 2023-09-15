import nodemailer from 'nodemailer';
function sendMail(from , to , subject, text){
const transporter = nodemailer.createTransport({
    //host: "smtp.forwardemail.net",
    service: "gmail",
    
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'GMAIL A/C USERID',
      pass: 'Gmail Password'
    }
  });

  const info = await transporter.sendMail({
    from: 'ram@gmail.com', // sender address
    to: "shyam@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}