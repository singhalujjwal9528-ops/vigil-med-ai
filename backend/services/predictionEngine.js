const predictRiskLevel = (patient) => {
  let score = 0;

  // Heart Rate
  if (patient.heartRate > 120) score += 2;
  else if (patient.heartRate > 100) score += 1;

  // SpO2
  if (patient.spo2 < 90) score += 3;
  else if (patient.spo2 < 95) score += 1;

  // Temperature
  if (patient.temperature > 102) score += 2;
  else if (patient.temperature > 100) score += 1;

  // Blood Pressure (systolic)
  const systolic = parseInt(patient.bloodPressure?.split("/")[0]);
  if (systolic > 160) score += 3;
  else if (systolic > 140) score += 1;

  console.log("Risk Score:", score);

  if (score <= 1) return "Low";
  if (score <= 3) return "Medium";
  if (score <= 5) return "High";

  return "Critical";
};

module.exports = predictRiskLevel;