const Registration = require(
  "../models/Registration"
);

const Event = require(
  "../models/Event"
);

const generateTicket = require(
  "../utils/generateTicket"
);

/*
=================================
REGISTER FOR EVENT
=================================
*/

exports.registerEvent = async (
  req,
  res
) => {
  try {
    const event =
      await Event.findById(
        req.params.eventId
      );

    if (!event) {
      return res
        .status(404)
        .json({
          message: "Event not found",
        });
    }

    const existingRegistration =
      await Registration.findOne({
        userId: req.user.id,
        eventId: event._id,
      });

    if (existingRegistration) {
      return res
        .status(400)
        .json({
          message:
            "Already registered for this event",
        });
    }

    const ticketNumber =
      "ES-" + Date.now();

    const qr =
      await generateTicket(
        ticketNumber
      );

    const registration =
      await Registration.create({
        userId: req.user.id,
        eventId: event._id,
        ticketNumber,
        ticketQR: qr,
      });

    event.registeredCount =
      (event.registeredCount || 0) + 1;

    await event.save();

    res.status(201).json(
      registration
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

/*
=================================
MY REGISTRATIONS
=================================
*/

exports.myRegistrations =
  async (req, res) => {
    try {
      const data =
        await Registration.find({
          userId: req.user.id,
        }).populate("eventId");

      res.json(data);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: err.message,
      });
    }
  };