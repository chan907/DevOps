const mongoose = require("mongoose");
try {
  mongoose.connect(process.env.DATABASE || "mongodb://mongo:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
