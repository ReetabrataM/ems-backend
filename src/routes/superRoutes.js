const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const superAdmin = require("../middleware/superAdmin");

const {
  getSuperDashboard,
} = require("../controller/superController");

router.get("/dashboard", auth, superAdmin, getSuperDashboard);

module.exports = router;
