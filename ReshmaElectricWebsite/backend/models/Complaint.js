const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  mobile: String,
  name: String,
  altMobile: String,
  pincode: String,
  policeStation: String,
  address: String,
  warranty: String,
  brand: String,
  modelName: String,
  namePlateImage: String,
  purchaseBillImage: String,
  otherFile: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
