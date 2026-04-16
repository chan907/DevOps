// Order Model
// Represents a completed purchase made by a user
// Stores the list of products, payment transaction ID, and delivery details

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    allProduct: [
      {
        id: { type: ObjectId, ref: "products" },  // Reference to the purchased product
        quantitiy: Number,                         // Quantity ordered (note: typo in original)
      },
    ],
    user: {
      type: ObjectId,
      ref: "users",
      required: true,           // The customer who placed the order
    },
    amount: {
      type: Number,
      required: true,           // Total payment amount charged
    },
    transactionId: {
      type: String,
      required: true,           // Braintree transaction ID for payment reference
    },
    address: {
      type: String,
      required: true,           // Delivery address entered at checkout
    },
    phone: {
      type: Number,
      required: true,           // Contact number for delivery
    },
    status: {
      type: String,
      default: "Not processed",
      // Allowed order lifecycle statuses
      enum: [
        "Not processed",        // Order placed, not yet reviewed
        "Processing",           // Order is being prepared
        "Shipped",              // Order dispatched for delivery
        "Delivered",            // Order received by customer
        "Cancelled",            // Order was cancelled
      ],
    },
  },
  { timestamps: true }          // Adds createdAt and updatedAt fields automatically
);

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;
