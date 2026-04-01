const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED", "ROLLED_BACK"],
    required: true,
  },
  steps: [
    {
      name: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["SUCCESS", "FAILED"],
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);