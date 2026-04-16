// Category Controller
// Handles CRUD operations for product categories
// Category images are uploaded via multer to public/uploads/categories/

const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const path = require("path");

// Helper: builds the full file path for a category image
const categoryImagePath = (filename) =>
  path.join(__dirname, "../public/uploads/categories/", filename);

class Category {

  // GET /api/category/all-category — Returns all categories sorted newest first
  async getAllCategory(req, res) {
    try {
      const Categories = await categoryModel.find({}).sort({ _id: -1 });
      return res.json({ Categories });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/category/add-category — Creates a new category with an uploaded image
  // Deletes the uploaded image if validation fails or category already exists
  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    const cImage = req.file ? req.file.filename : null;  // Filename from multer upload

    if (!cName || !cDescription || !cStatus || !cImage) {
      if (cImage) fs.unlink(categoryImagePath(cImage), () => {});  // Clean up orphaned upload
      return res.json({ error: "All fields are required" });
    }

    cName = toTitleCase(cName);  // Normalize to Title Case before saving
    try {
      // Prevent duplicate category names
      const existing = await categoryModel.findOne({ cName });
      if (existing) {
        fs.unlink(categoryImagePath(cImage), () => {});  // Remove uploaded image
        return res.json({ error: "Category already exists" });
      }
      const newCategory = new categoryModel({ cName, cDescription, cStatus, cImage });
      await newCategory.save();
      return res.json({ success: "Category created successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/category/edit-category — Updates description and status of a category
  // Note: category name and image cannot be changed after creation
  async postEditCategory(req, res) {
    const { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields are required" });
    }
    try {
      await categoryModel.findByIdAndUpdate(cId, { cDescription, cStatus, updatedAt: Date.now() });
      return res.json({ success: "Category updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/category/delete-category — Deletes a category and its image from disk
  async getDeleteCategory(req, res) {
    const { cId } = req.body;
    if (!cId) return res.json({ error: "All fields are required" });
    try {
      const category = await categoryModel.findById(cId);
      const deleted = await categoryModel.findByIdAndDelete(cId);
      if (deleted) {
        // Remove the category image file from the uploads folder
        fs.unlink(categoryImagePath(category.cImage), (err) => {
          if (err) console.log(err);
        });
        return res.json({ success: "Category deleted successfully" });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
