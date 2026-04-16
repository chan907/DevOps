/* 
================== Important Setup Notes ==================

* Issue 1 - Upload Folders:
  The server auto-creates these folders on startup if they don't exist:
  public -> uploads -> 1. products  2. customize  3. categories

* Issue 2 - Admin Signup:
  To create an admin account, set userRole: 1 in the newUser object
  inside the auth controller (postSignup method).
  userRole: 0 = customer (default), userRole: 1 = admin
*/

const express = require("express");
const app = express();
require("dotenv").config();       // Load environment variables from .env file
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// ── Route Imports ────────────────────────────────────────────────────────────
const authRouter = require("./routes/auth");           // Signup, signin, role check
const categoryRouter = require("./routes/categories"); // CRUD for product categories
const productRouter = require("./routes/products");    // CRUD for products + reviews
const brainTreeRouter = require("./routes/braintree"); // Payment token + processing
const orderRouter = require("./routes/orders");        // Order creation and management
const usersRouter = require("./routes/users");         // User profile and password
const customizeRouter = require("./routes/customize"); // Slider images + dashboard stats

// Auth middleware — checks if user is logged in via JWT token
const { loginCheck } = require("./middleware/auth");

// Auto-creates upload folders (categories, products, customize) if missing
const CreateAllFolder = require("./config/uploadFolderCreateScript");
CreateAllFolder();

// ── Database Connection ──────────────────────────────────────────────────────
// DATABASE env var is set in .env (local) or docker-compose.yml (container)
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(morgan("dev"));                          // Log HTTP requests to console
app.use(cookieParser());                         // Parse cookies from request headers
app.use(cors());                                 // Allow cross-origin requests (React frontend)
app.use(express.static("public"));              // Serve static files (uploaded images)
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data
app.use(express.json());                         // Parse JSON request bodies

// ── API Routes ───────────────────────────────────────────────────────────────
app.use("/api", authRouter);                    // POST /api/signup, /api/signin, etc.
app.use("/api/user", usersRouter);              // GET/POST /api/user/...
app.use("/api/category", categoryRouter);       // GET/POST /api/category/...
app.use("/api/product", productRouter);         // GET/POST /api/product/...
app.use("/api", brainTreeRouter);               // POST /api/braintree/...
app.use("/api/order", orderRouter);             // GET/POST /api/order/...
app.use("/api/customize", customizeRouter);     // GET/POST /api/customize/...

// ── Start Server ─────────────────────────────────────────────────────────────
// PORT defaults to 8000 if not set in environment (matches docker-compose EXPOSE)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
