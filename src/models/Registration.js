const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    ticketNumber: {
      type: String,
      unique: true,
    },
    ticketQR: {
  type: String,
  default: ""
}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Registration",
  registrationSchema
);