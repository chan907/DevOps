// User Controller
// Handles user profile retrieval, profile editing, and password changes
// Admin can view all users; individual users manage their own profiles

const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class User {

  // GET /api/user/all-user — Returns all users sorted newest first (admin use)
  async getAllUser(req, res) {
    try {
      const Users = await userModel.find({}).sort({ _id: -1 });
      return res.json({ Users });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/user/single-user — Returns profile info for a specific user
  // Only returns safe fields (excludes password, role, secretKey)
  async getSingleUser(req, res) {
    const { uId } = req.body;
    if (!uId) return res.json({ error: "All fields are required" });
    try {
      const User = await userModel
        .findById(uId)
        .select("name email phoneNumber userImage updatedAt createdAt");
      if (User) return res.json({ User });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/user/edit-user — Updates user's name and phone number
  async postEditUser(req, res) {
    const { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ error: "All fields are required" });
    }
    try {
      await userModel.findByIdAndUpdate(uId, { name, phoneNumber, updatedAt: Date.now() });
      return res.json({ success: "Profile updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/user/change-password — Changes user's password after verifying old password
  // Old password is compared against the stored bcrypt hash before updating
  async changePassword(req, res) {
    const { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ error: "All fields are required" });
    }
    try {
      const data = await userModel.findById(uId);
      if (!data) return res.json({ error: "Invalid user" });

      // Verify old password matches the stored hash
      const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
      if (!oldPassCheck) return res.json({ error: "Your old password is incorrect" });

      // Hash the new password and save
      const hashed = bcrypt.hashSync(newPassword, 10);
      await userModel.findByIdAndUpdate(uId, { password: hashed });
      return res.json({ success: "Password updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

const usersController = new User();
module.exports = usersController;
