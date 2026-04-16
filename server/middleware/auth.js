// Authentication & Authorization Middleware
// Three middleware functions used to protect routes:
//   loginCheck → verifies JWT token (is the user logged in?)
//   isAuth     → verifies the request user matches the logged-in user
//   isAdmin    → verifies the user has admin role (userRole === 1)

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/users");

// Middleware 1: loginCheck
// Reads the JWT token from the request header, verifies it, and attaches
// the decoded user info (id, role) to req.userDetails for downstream use
exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) return res.json({ error: "You must be logged in" });

    token = token.replace("Bearer ", "");  // Strip "Bearer " prefix if present
    const decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;              // Attach decoded payload to request
    next();
  } catch (err) {
    return res.json({ error: "You must be logged in" });
  }
};

// Middleware 2: isAuth
// Ensures the loggedInUserId in the request body matches the token's user ID
// Prevents users from modifying other users' data
exports.isAuth = (req, res, next) => {
  const { loggedInUserId } = req.body;
  if (!loggedInUserId || !req.userDetails._id || loggedInUserId != req.userDetails._id) {
    return res.status(403).json({ error: "You are not authenticated" });
  }
  next();
};

// Middleware 3: isAdmin
// Looks up the user in the database and checks if userRole === 1 (admin)
// Used to protect admin-only routes (e.g. add/edit/delete products)
exports.isAdmin = async (req, res, next) => {
  try {
    const reqUser = await userModel.findById(req.body.loggedInUserId);
    if (!reqUser || reqUser.userRole === 0) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
