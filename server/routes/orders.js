// Order Routes
// Base path: /api/order
// Handles order lifecycle: create → view → update status → delete

const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");

router.get("/get-all-orders", ordersController.getAllOrders);       // Admin: get all orders
router.post("/order-by-user", ordersController.getOrderByUser);     // User: get their own orders

router.post("/create-order", ordersController.postCreateOrder);     // Create order after payment
router.post("/update-order", ordersController.postUpdateOrder);     // Admin: update order status
router.post("/delete-order", ordersController.postDeleteOrder);     // Admin: delete an order

module.exports = router;
