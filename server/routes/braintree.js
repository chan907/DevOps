// Braintree Payment Routes
// Base path: /api/braintree
// Two-step payment flow:
//   Step 1: Frontend calls get-token to initialize the Braintree Drop-in UI
//   Step 2: Frontend submits the payment nonce to /payment to charge the customer

const express = require("express");
const router = express.Router();
const brainTreeController = require("../controller/braintree");

router.post("/braintree/get-token", brainTreeController.ganerateToken);  // Generate client token for Drop-in UI
router.post("/braintree/payment", brainTreeController.paymentProcess);   // Process payment and return transaction result

module.exports = router;
