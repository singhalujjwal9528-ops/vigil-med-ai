
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const alertRoutes = require("./routes/alertRoutes");

// Middleware
const { protect } = require("./middleware/auth");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("VitalGuard Backend Running");
});

// Test Route
app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "POST route working",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Patient Routes
app.use("/api/patients", patientRoutes);

// Alert Routes
app.use("/api/alerts", alertRoutes);

// Protected Profile Route
app.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});