const Merchandise = require("../models/Merchandise");

/* ================= GET ================= */
exports.getProducts = async (req, res) => {
  try {
    const products = await Merchandise.find();
    res.json(products);
  } catch (err) {
    console.log("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.createProduct = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const product = await Merchandise.create({
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: req.body.image || "",
    });

    res.status(201).json(product);
  } catch (err) {
    console.log("CREATE PRODUCT ERROR:", err);

    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Merchandise.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        image: req.body.image || "",
      },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.log("UPDATE PRODUCT ERROR:", err);

    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteProduct = async (req, res) => {
  try {
    await Merchandise.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    console.log("DELETE PRODUCT ERROR:", err);

    res.status(500).json({ message: err.message });
  }
};