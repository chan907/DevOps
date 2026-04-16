// Auto-creates the required upload directories on server startup
// Prevents multer from throwing errors when trying to save uploaded files
// Called once in app.js before any routes are registered

const fs = require("fs");

// Paths where uploaded images are stored (relative to server/ directory)
const categoriesFolder = "./public/uploads/categories";
const customizeFolder = "./public/uploads/customize";
const productsFolder = "./public/uploads/products";

const CreateAllFolder = () => {
  // Create categories upload folder if it doesn't exist
  if (!fs.existsSync(categoriesFolder)) {
    fs.mkdirSync(categoriesFolder, { recursive: true });
  }

  // Create customize (slider images) upload folder if it doesn't exist
  if (!fs.existsSync(customizeFolder)) {
    fs.mkdirSync(customizeFolder, { recursive: true });
  }

  // Create products upload folder if it doesn't exist
  if (!fs.existsSync(productsFolder)) {
    fs.mkdirSync(productsFolder, { recursive: true });
  }
};

module.exports = CreateAllFolder;
