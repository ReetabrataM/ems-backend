const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalEvents =
      await Event.countDocuments();

    const totalRegistrations =
      await Registration.countDocuments();

    const eventData =
      await Event.find();

    const totalRevenue =
      eventData.reduce(
        (acc, event) =>
          acc +
          event.fee *
            event.registeredCount,
        0
      );

    res.json({
      totalUsers,
      totalEvents,
      totalRegistrations,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};