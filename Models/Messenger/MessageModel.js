const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    bandId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
    },
    messages: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
