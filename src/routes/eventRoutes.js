const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post(
  "/",
  auth,
  admin,
  createEvent
);

router.put(
  "/:id",
  auth,
  admin,
  updateEvent
);

router.delete(
  "/:id",
  auth,
  admin,
  deleteEvent
);

module.exports = router;