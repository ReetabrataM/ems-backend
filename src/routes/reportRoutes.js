const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const superAdmin =
require("../middleware/superAdmin");

const {
  getFinancialReport,
  getInventoryAnalytics
} = require("../controller/reportController");

router.get(
  "/financial",
  auth,
  superAdmin,
  getFinancialReport
);

router.get(
  "/inventory",
  auth,
  admin,
  getInventoryAnalytics
);

module.exports = router;