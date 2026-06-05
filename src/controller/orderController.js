const razorpay = require("../config/razorpay");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart Empty",
      });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
    });

    const order = await Order.create({
      userId: req.user.id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
    });

    res.json({
      order,
      razorpayOrder,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET MY ORDERS
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};