const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    heartRate: {
      type: Number,
      default: 0,
    },

    bloodPressure: {
      type: String,
      default: "0/0",
    },

    spo2: {
      type: Number,
      default: 0,
    },

    temperature: {
      type: Number,
      default: 0,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },

    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);