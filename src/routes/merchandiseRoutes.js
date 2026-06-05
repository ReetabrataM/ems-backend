const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/merchandiseController");

/* PUBLIC - GET ALL PRODUCTS */
router.get("/", getProducts);

/* ADMIN ONLY */
router.post("/", auth, admin, createProduct);

router.put("/:id", auth, admin, updateProduct);

router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;