const express = require("express");
const router = express.Router();

const {
  addPatient,
  getPatients,
  getPatientById,
  updatePatient,
} = require("../controllers/patientController");

const { protect } = require("../middleware/auth");

router.post("/", protect, addPatient);
router.get("/", protect, getPatients);
router.get("/:id", protect, getPatientById);
router.put("/:id", protect, updatePatient);

module.exports = router;