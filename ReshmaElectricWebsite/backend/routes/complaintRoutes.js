const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  registerComplaint
} = require('../controllers/complaintController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'namePlateImage' },
    { name: 'purchaseBillImage' },
    { name: 'otherFile' }
  ]),
  registerComplaint
);

module.exports = router;
