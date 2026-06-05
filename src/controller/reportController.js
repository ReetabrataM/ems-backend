const Order = require("../models/Order");
const Merchandise = require("../models/Merchandise");

exports.getFinancialReport = async (req, res) => {
  try {
    const paidOrders = await Order.find({
      paymentStatus: "paid",
    });

    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const totalOrders = paidOrders.length;

    res.json({
      totalRevenue,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// PASTE IT HERE
exports.getInventoryAnalytics = async (req, res) => {
  try {
    const products = await Merchandise.find();

    const totalStock = products.reduce(
      (sum, item) => sum + item.stock,
      0
    );

    const lowStock = products.filter(
      (item) => item.stock < 10
    );

    res.json({
      totalProducts: products.length,
      totalStock,
      lowStock,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};