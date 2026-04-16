// Braintree Payment Controller
// Handles payment processing using the Braintree sandbox (test) environment
// Two steps: 1) generate a client token for the frontend, 2) process the payment

var braintree = require("braintree");
require("dotenv").config();

// Initialize Braintree gateway with credentials from environment variables
// Uses Sandbox environment — switch to braintree.Environment.Production for live payments
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

class brainTree {

  // POST /api/braintree/get-token
  // Generates a client token that the React frontend uses to initialize the Braintree Drop-in UI
  ganerateToken(req, res) {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.json(err);
      }
      return res.json(response);  // Returns { clientToken: "..." } to the frontend
    });
  }

  // POST /api/braintree/payment
  // Processes the actual payment transaction using the nonce from the frontend
  // amountTotal: total price, paymentMethod: nonce from Braintree Drop-in UI
  paymentProcess(req, res) {
    let { amountTotal, paymentMethod } = req.body;
    gateway.transaction.sale(
      {
        amount: amountTotal,
        paymentMethodNonce: paymentMethod,  // One-time token representing the payment method
        options: {
          submitForSettlement: true,  // Immediately submit for settlement (charge the card)
        },
      },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.json(err);
        }

        if (result.success) {
          console.log("Transaction ID: " + result.transaction.id);
          return res.json(result);  // Frontend uses result.transaction.id to create the order
        } else {
          console.error(result.message);  // Payment declined or failed
        }
      }
    );
  }
}

const brainTreeController = new brainTree();
module.exports = brainTreeController;
