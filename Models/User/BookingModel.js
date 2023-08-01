const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  bandId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  advprice: {
    type: String,
    required: true,
  },
  peoplecount: {
    type: String,
    required: true,
  },
  occassion: {
    type: String,
    required: true,
  },
  band: {
    type: String,
    required: true,
  },
  fromdate: {
    type: String,
    required: true,
  },
  todate: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  paymentstaus: {
    type: Boolean,
    default: false,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("booking", bookingSchema);
