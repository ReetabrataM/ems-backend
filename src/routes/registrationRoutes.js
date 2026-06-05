const express = require("express");

const router = express.Router();

const auth = require(
  "../middleware/auth"
);

const {
  registerEvent,
  myRegistrations,
} = require(
  "../controller/registrationController"
);

router.post(
  "/:eventId",
  auth,
  registerEvent
);

router.get(
  "/my",
  auth,
  myRegistrations
);

module.exports = router;