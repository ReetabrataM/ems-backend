const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth");

const {
 getCart,
 addToCart
}
=
require(
"../controller/cartController"
);

router.get(
"/",
auth,
getCart
);

router.post(
"/add",
auth,
addToCart
);

module.exports =
router;