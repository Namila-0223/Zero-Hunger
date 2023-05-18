const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  donationTitle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  donationDescription: {
    type: String,
    required: true,
  },
  numberOfRequests: {
    type: Number,
    required: true,
    default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  donationStartDate: {
    type: Date,
    default: Date.now,
  },
  donationEndDate: {
    type: Date,
  },
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
