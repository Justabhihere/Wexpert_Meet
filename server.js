// Install necessary packages: npm install express nodemailer cors
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

app.post('/send-email', async (req, res) => {
  const { senderEmail, senderPassword, recipientEmails } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: recipientEmails.join(', '),
    subject: 'About Meeting',
    text: 'This is a test email body.',
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
