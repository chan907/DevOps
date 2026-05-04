const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect("mongodb://mongo:27017/Ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database Connected Successfully");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1); // exit if DB not connected
  }
};

module.exports = connectDB;