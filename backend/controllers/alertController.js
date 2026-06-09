
const Alert = require("../models/Alert");

// Get All Alerts
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("patient", "patientId name")
      .sort({ createdAt: -1 });

    res.status(200).json(alerts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAlerts,
};
