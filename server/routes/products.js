// Product Routes
// Base path: /api/product
// Handles product CRUD, filtering, cart/wishlist, and reviews
// Image uploads handled by multer (stores files in public/uploads/products/)

const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");

// Multer storage config: saves files to products upload folder with timestamp prefix
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);  // e.g. 1720000000000_shirt.jpg
  },
});

const upload = multer({ storage: storage });

// Public product listing routes (no auth required)
router.get("/all-product", productController.getAllProduct);                        // All products
router.post("/product-by-category", productController.getProductByCategory);       // Filter by category
router.post("/product-by-price", productController.getProductByPrice);             // Filter by max price
router.post("/wish-product", productController.getWishProduct);                    // Wishlist products
router.post("/cart-product", productController.getCartProduct);                    // Cart products

// Admin product management routes (upload.any() accepts multiple files)
router.post("/add-product", upload.any(), productController.postAddProduct);       // Create product
router.post("/edit-product", upload.any(), productController.postEditProduct);     // Update product
router.post("/delete-product", productController.getDeleteProduct);                // Delete product
router.post("/single-product", productController.getSingleProduct);                // Get one product

// Review routes
router.post("/add-review", productController.postAddReview);                       // Submit review
router.post("/delete-review", productController.deleteReview);                     // Remove review

module.exports = router;
