const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getAllUsers,
  promoteUser,
  demoteUser,
  deleteUser,
  getAllAdmins,
  createAdmin,
  deleteAdmin,
} = require("../controller/adminController");

/* ================= USERS MANAGEMENT ================= */
router.get("/users", auth, admin, getAllUsers);

router.patch("/promote/:id", auth, admin, promoteUser);

router.patch("/demote/:id", auth, admin, demoteUser);

router.delete("/users/:id", auth, admin, deleteUser);

/* ================= ADMINS MANAGEMENT ================= */
router.get("/admins", auth, admin, getAllAdmins);

router.post("/admins", auth, admin, createAdmin);

router.delete("/admins/:id", auth, admin, deleteAdmin);

module.exports = router;
