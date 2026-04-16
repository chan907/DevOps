// Product Model
// Represents a product listed in the ecommerce store
// Each product belongs to one category and stores exactly 2 images

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: true,             // Product display name
    },
    pDescription: {
      type: String,
      required: true,             // Full product description (max 3000 chars enforced in controller)
    },
    pPrice: {
      type: Number,
      required: true,             // Price in INR (or applicable currency)
    },
    pSold: {
      type: Number,
      default: 0,                 // Tracks total units sold
    },
    pQuantity: {
      type: Number,
      default: 0,                 // Current stock quantity
    },
    pCategory: {
      type: ObjectId,
      ref: "categories",          // Reference to the Category document
    },
    pImages: {
      type: Array,
      required: true,             // Array of 2 image filenames stored in public/uploads/products/
    },
    pOffer: {
      type: String,
      default: null,              // Discount percentage as string (e.g. "10" = 10% off)
    },
    pRatingsReviews: [
      {
        review: String,           // Text review written by the user
        user: { type: ObjectId, ref: "users" },  // Reference to the reviewing user
        rating: String,           // Star rating (e.g. "4")
        createdAt: {
          type: Date,
          default: Date.now(),    // Timestamp of when the review was submitted
        },
      },
    ],
    pStatus: {
      type: String,
      required: true,             // "Active" or "Inactive" — controls visibility in shop
    },
  },
  { timestamps: true }            // Adds createdAt and updatedAt fields automatically
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
