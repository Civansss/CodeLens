const express = require("express");
const {
  signup,
  login,
  getProfile,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/profile", auth, getProfile);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;