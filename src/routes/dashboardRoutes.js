const express = require("express");

const router = express.Router();

const auth =
require("../middleware/auth");

const admin =
require("../middleware/admin");

const {
 getDashboardStats
}
=
require(
"../controller/dashboardController"
);

router.get(
"/stats",
auth,
admin,
getDashboardStats
);

module.exports = router;