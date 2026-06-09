const Patient = require("../models/Patient");
const Alert = require("../models/Alert");
const predictRiskLevel = require("../services/predictionEngine");
const { getIO } = require("../config/socket");

// Add Patient
const addPatient = async (req, res) => {
  try {
    const predictedRisk = predictRiskLevel(req.body);

    req.body.riskLevel = predictedRisk;

    const patient = await Patient.create(req.body);

    // Auto Alert Generation + Socket Event
    if (patient.riskLevel === "Critical") {
      const alert = await Alert.create({
        patient: patient._id,
        message: `Critical condition detected for ${patient.name}`,
        severity: "Critical",
      });

      const io = getIO();

      io.emit("newAlert", {
        patientId: patient.patientId,
        patientName: patient.name,
        severity: alert.severity,
        message: alert.message,
      });

      console.log("Real-time alert emitted");
    }

    res.status(201).json({
      message: "Patient added successfully",
      patient,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate(
      "assignedDoctor",
      "name email role"
    );

    res.status(200).json(patients);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Patient By ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Patient
const updatePatient = async (req, res) => {
  try {
    const predictedRisk = predictRiskLevel(req.body);

    req.body.riskLevel = predictedRisk;

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
};