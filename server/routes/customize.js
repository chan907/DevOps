// Customize Routes
// Base path: /api/customize
// Manages homepage slider images and provides admin dashboard statistics
// Image uploads handled by multer (stores files in public/uploads/customize/)

const express = require("express");
const router = express.Router();
const customizeController = require("../controller/customize");
const multer = require("multer");

// Multer storage config: saves slider images with timestamp prefix
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/customize");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);  // e.g. 1720000000000_banner.jpg
  },
});

const upload = multer({ storage: storage });

router.get("/get-slide-image", customizeController.getImages);                                    // Get all slider images
router.post("/delete-slide-image", customizeController.deleteSlideImage);                         // Delete a slider image
router.post("/upload-slide-image", upload.single("image"), customizeController.uploadSlideImage); // Upload new slider image
router.post("/dashboard-data", customizeController.getAllData);                                   // Get counts for admin dashboard

module.exports = router;
