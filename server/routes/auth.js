// Auth Routes
// Base path: /api
// Handles signup, signin, role check, and fetching all users (admin only)

const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, isAuth, isAdmin } = require("../middleware/auth");

router.post("/isadmin", authController.isAdmin);                          // Check if user is admin
router.post("/signup", authController.postSignup);                        // Register new account
router.post("/signin", authController.postSignin);                        // Login and get JWT token
router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser); // Get all users (admin only)

module.exports = router;
