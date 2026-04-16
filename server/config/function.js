// Shared helper/utility functions used across controllers

const userModel = require("../models/users");

// Converts a string to Title Case (e.g. "john doe" → "John Doe")
// Used when saving user names and category names to keep data consistent
exports.toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Validates email format using a regex pattern
// Returns true if valid, false otherwise
exports.validateEmail = function (mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};

// Checks if an email already exists in the database
// Returns true if found (duplicate), false if available
exports.emailCheckInDatabase = async function (email) {
  const user = await userModel.findOne({ email });
  return !!user;
};

// Checks if a phone number already exists in the database
// Returns true if found (duplicate), false if available
exports.phoneNumberCheckInDatabase = async function (phoneNumber) {
  const user = await userModel.findOne({ phoneNumber });
  return !!user;
};
