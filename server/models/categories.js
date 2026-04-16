// Category Model
// Represents a product category (e.g. Men, Women, Kids)
// Products reference categories via ObjectId

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cName: {
      type: String,
      required: true,    // Category display name (stored in Title Case)
    },
    cDescription: {
      type: String,
      required: true,    // Short description shown on the category page
    },
    cImage: {
      type: String,      // Image filename stored in public/uploads/categories/
    },
    cStatus: {
      type: String,
      required: true,    // "Active" or "Inactive" — controls visibility in shop
    },
  },
  { timestamps: true }   // Adds createdAt and updatedAt fields automatically
);

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;
