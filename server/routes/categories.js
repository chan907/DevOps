// Category Routes
// Base path: /api/category
// Add/edit/delete routes are protected by loginCheck (JWT required)
// Image uploads handled by multer (stores files in public/uploads/categories/)

const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categories");
const multer = require("multer");
const { loginCheck } = require("../middleware/auth");

// Multer storage config: saves category images with timestamp prefix
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);  // e.g. 1720000000000_men.jpg
  },
});

const upload = multer({ storage: storage });

router.get("/all-category", categoryController.getAllCategory);  // Public: list all categories

// Protected routes — require valid JWT token
router.post("/add-category", loginCheck, upload.single("cImage"), categoryController.postAddCategory);  // Create category with image
router.post("/edit-category", loginCheck, categoryController.postEditCategory);                          // Update description/status
router.post("/delete-category", loginCheck, categoryController.getDeleteCategory);                       // Delete category + image

module.exports = router;
