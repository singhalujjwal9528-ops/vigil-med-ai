const Patient = require("../models/Patient");
const Alert = require("../models/Alert");
const predictRiskLevel = require("../services/predictionEngine");

// Add Patient
const addPatient = async (req, res) => {
  try {
    const predictedRisk = predictRiskLevel(req.body);

    req.body.riskLevel = predictedRisk;

    const patient = await Patient.create(req.body);

    console.log("Patient Risk Level:", patient.riskLevel);

    if (patient.riskLevel === "Critical" || patient.riskLevel === "High") {
      try {
        await Alert.create({
          patient: patient._id,
          message: `Critical condition detected for ${patient.name}`,
          severity: patient.riskLevel,
        });
        console.log("Alert Created Successfully");
      } catch (alertError) {
        console.error("Alert Creation Failed:", alertError.message);
      }
    }

    res.status(201).json({
      message: "Patient added successfully",
      patient,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Patient ID already exists, use a unique patientId",
      });
    }

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

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Patient ID already exists, use a unique patientId",
      });
    }

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