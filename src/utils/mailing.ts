import * as nodemailer from 'nodemailer';

export interface IEmail {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: IEmail): Promise<string> {
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
  const info = await transport.sendMail(mailOptions);
  return nodemailer.getTestMessageUrl(info);
}
