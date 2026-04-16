// User Routes
// Base path: /api/user
// Handles user profile viewing, editing, and password management

const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.get("/all-user", usersController.getAllUser);              // Admin: list all users
router.post("/signle-user", usersController.getSingleUser);      // Get a single user's profile (note: typo in URL kept for compatibility)
router.post("/edit-user", usersController.postEditUser);         // Update name and phone number
router.post("/change-password", usersController.changePassword); // Change password (requires old password)

module.exports = router;
