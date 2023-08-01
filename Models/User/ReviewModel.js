const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  bandId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required : true,
  },
  rate: {
    type: String,
  },
  name: {
    type: String,
  },
  message: {
    type: String,
  },
  date : {
    type : Date
  }
});

module.exports = mongoose.model("review", reviewSchema);
