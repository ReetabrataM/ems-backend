const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    speaker: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    fee: {
      type: Number,
      default: 0,
    },

    seats: {
      type: Number,
      default: 100,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    startTime: Date,

    endTime: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);