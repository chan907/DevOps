// Auth Controller
// Handles user registration, login, and role checking
// Routes: POST /api/signup, /api/signin, /api/isadmin, /api/user

const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {

  // GET role of a user by their ID
  // Used by the frontend to determine if the logged-in user is admin or customer
  async isAdmin(req, res) {
    const { loggedInUserId } = req.body;
    try {
      const user = await userModel.findById(loggedInUserId);
      return res.json({ role: user.userRole });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  // GET all registered users (admin only, protected by middleware)
  async allUser(req, res) {
    try {
      const allUser = await userModel.find({});
      return res.json({ users: allUser });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  // POST /api/signup — Register a new user account
  // Validates input, checks for duplicate email, hashes password, saves to DB
  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};

    // Check all fields are provided
    if (!name || !email || !password || !cPassword) {
      error = {
        name: "Field must not be empty",
        email: "Field must not be empty",
        password: "Field must not be empty",
        cPassword: "Field must not be empty",
      };
      return res.json({ error });
    }

    if (name.length < 3 || name.length > 25) {
      return res.json({ error: { ...error, name: "Name must be 3-25 characters" } });
    }

    if (!validateEmail(email)) {
      return res.json({ error: { ...error, email: "Email is not valid" } });
    }

    if (password.length < 8 || password.length > 255) {
      return res.json({ error: { ...error, password: "Password must be at least 8 characters" } });
    }

    try {
      // Prevent duplicate accounts
      const existing = await userModel.findOne({ email });
      if (existing) {
        return res.json({ error: { ...error, email: "Email already exists" } });
      }

      name = toTitleCase(name);                    // Normalize name to Title Case
      const hashed = bcrypt.hashSync(password, 10); // Hash password with salt rounds = 10

      const newUser = new userModel({
        name,
        email,
        password: hashed,
        userRole: 0,  // 0 = customer (change to 1 here to create an admin account)
      });

      await newUser.save();
      return res.json({ success: "Account created successfully. Please login" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/signin — Log in with email and password
  // Returns a JWT token and decoded user info on success
  async postSignin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "Fields must not be empty" });
    }
    try {
      const data = await userModel.findOne({ email });
      if (!data) return res.json({ error: "Invalid email or password" });

      // Compare submitted password against stored bcrypt hash
      const login = await bcrypt.compare(password, data.password);
      if (!login) return res.json({ error: "Invalid email or password" });

      // Sign JWT with user ID and role — frontend stores this token for auth headers
      const token = jwt.sign({ _id: data._id, role: data.userRole }, JWT_SECRET);
      const encode = jwt.verify(token, JWT_SECRET);
      return res.json({ token, user: encode });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

const authController = new Auth();
module.exports = authController;
