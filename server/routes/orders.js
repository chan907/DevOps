const express = require("express");
const router = express.Router();

const ordersController = require("../controller/orders");

// CREATE ORDER
router.post("/place-order", ordersController.postCreateOrder);

// GET ALL ORDERS
router.get("/get-all-orders", ordersController.getAllOrders);

// USER ORDERS
router.post("/get-order-by-user",ordersController.getOrderByUser);

// UPDATE ORDER
router.post("/update-order", ordersController.postUpdateOrder);

// DELETE ORDER
router.post("/delete-order", ordersController.postDeleteOrder);

module.exports = router;