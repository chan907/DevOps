// Customize Model
// Stores homepage slider/banner images uploaded by the admin
// Each document represents one slide image shown in the frontend carousel

const mongoose = require("mongoose");

const customizeSchema = new mongoose.Schema(
  {
    slideImage: {
      type: String,      // Filename of the uploaded slider image (stored in public/uploads/customize/)
    },
    firstShow: {
      type: Number,
      default: 0,        // Reserved for ordering slides (not yet fully implemented)
    },
  },
  { timestamps: true }   // Adds createdAt and updatedAt fields automatically
);

const customizeModel = mongoose.model("customizes", customizeSchema);
module.exports = customizeModel;
