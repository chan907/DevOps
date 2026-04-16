// User Model
// Represents a registered user (customer or admin) in the database
// userRole: 0 = customer, 1 = admin

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,              // Limit display name length
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },   // Prevent duplicate accounts with same email
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
      required: true,            // Stored as bcrypt hash, never plain text
    },
    userRole: {
      type: Number,
      required: true,            // 0 = customer, 1 = admin
    },
    phoneNumber: {
      type: Number,              // Optional contact number
    },
    userImage: {
      type: String,
      default: "user.png",       // Default avatar filename
    },
    verified: {
      type: String,
      default: false,            // Email verification flag (not yet implemented)
    },
    secretKey: {
      type: String,
      default: null,             // Reserved for future use (e.g. password reset token)
    },
    history: {
      type: Array,
      default: [],               // Order/browsing history (stored as array of IDs)
    },
  },
  { timestamps: true }           // Adds createdAt and updatedAt fields automatically
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
