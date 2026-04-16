// Database connection configuration
// Used as an alternative standalone connection (app.js also connects via mongoose directly)
// DATABASE env var: set in .env for local dev, or docker-compose.yml for containers

const mongoose = require("mongoose");
try {
  // Falls back to local Docker MongoDB if DATABASE env var is not set
  mongoose.connect(process.env.DATABASE || "mongodb://mongo:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
