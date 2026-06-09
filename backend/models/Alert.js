const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },

    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Alert", alertSchema);