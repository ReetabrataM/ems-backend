const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createOrder,
  myOrders,
} = require("../controller/orderController");

// Create order
router.post("/create", auth, createOrder);

// Get logged-in user's orders
router.get("/my", auth, myOrders);

module.exports = router;