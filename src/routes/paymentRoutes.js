const express =
require("express");

const router =
express.Router();

const {
 verifyPayment
}
=
require(
"../controller/paymentController"
);

router.post(
"/verify",
verifyPayment
);

module.exports =
router;