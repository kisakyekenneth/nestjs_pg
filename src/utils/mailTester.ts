import * as nodemailer from 'nodemailer';

export interface IEmail {
  to: string;
  subject: string;
  html: string;
}

// async..await is not allowed in global scope, must use a wrapper
export async function mailSender(data: IEmail) {
  // create reusable transporter object using the default SMTP transport

  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'b8c3577dda021b',
      pass: '324ef3085b5a84',
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  // send mail with defined transport object
  const info = await transport.sendMail(mailOptions);
  return nodemailer.getTestMessageUrl(info);
}
