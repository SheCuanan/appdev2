const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

require('dotenv').config();

// console.log('SMTP config:', {
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   user: process.env.SMTP_USER,
// });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendBookNotificationEmail = async (book) => {
  try {
    const html = pug.renderFile(path.join(__dirname, '..', 'views', 'bookCreated.pug'), {
      title: book.title,
      author: book.author,
      year: book.year,
    });

    await transporter.sendMail({
      from: `"Book System" <${process.env.SMTP_USER}>`,
      to: process.env.DEFAULT_EMAIL,
      subject: 'New Book Added!',
      html,
    });
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
};
