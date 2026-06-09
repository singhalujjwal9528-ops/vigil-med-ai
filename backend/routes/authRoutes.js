console.log("Auth Routes Loaded");

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.get("/check", (req, res) => {
  res.json({
    message: "Auth routes working",
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;