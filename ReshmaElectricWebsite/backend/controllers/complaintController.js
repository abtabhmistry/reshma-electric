const Complaint = require('../models/Complaint');
const nodemailer = require('nodemailer');

exports.registerComplaint = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const complaint = new Complaint({
      ...data,
      namePlateImage: files.namePlateImage?.[0]?.path || '',
      purchaseBillImage: files.purchaseBillImage?.[0]?.path || '',
      otherFile: files.otherFile?.[0]?.path || ''
    });

    await complaint.save();

    // Email to company
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'electricreshma@gmail.com',
      subject: 'New Complaint Registered',
      text: `Complaint by ${data.name} (${data.mobile})\nAddress: ${data.address}\nModel: ${data.modelName}`
    };

    await transporter.sendMail(mailOptions);

    // Simulated SMS
    console.log(`SMS sent to 9674122198: New complaint from ${data.name}`);

    res.status(200).json({ message: 'Complaint Registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
