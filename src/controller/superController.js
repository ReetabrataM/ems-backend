const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Order = require("../models/Order");

exports.getSuperDashboard = async (req, res) => {
  try {

    /* ── Core counts ──────────────────────────────── */
    const totalUsers = await User.countDocuments({ role: { $ne: "superadmin" } });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await Registration.countDocuments();

    /* ── Event revenue ────────────────────────────── */
    const events = await Event.find().select("fee registeredCount registrations");
    const totalEventRevenue = events.reduce(
      (acc, e) => {
        const count = e.registeredCount ?? (e.registrations?.length || 0);
        return acc + (e.fee || 0) * count;
      },
      0
    );

    /* ── Merchandise revenue ──────────────────────── */
    let merchandiseRevenue = 0;
    try {
      const orders = await Order.find({ paymentStatus: "paid" }).select("totalAmount");
      merchandiseRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
    } catch {
      // Order model may not exist yet — gracefully default to 0
      merchandiseRevenue = 0;
    }

    const totalRevenue = totalEventRevenue + merchandiseRevenue;

    /* ── Monthly revenue data (last 6 months) ─────── */
    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const revenueData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      const regs = await Registration.find({
        createdAt: { $gte: start, $lt: end },
      }).populate("eventId", "fee");

      const revenue = regs.reduce(
        (acc, r) => acc + (r.eventId?.fee || 0),
        0
      );

      revenueData.push({
        month: monthNames[date.getMonth()],
        revenue,
      });
    }

    /* ── Recent users ─────────────────────────────── */
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select("name email role createdAt");

    /* ── Response ─────────────────────────────────── */
    res.json({
      stats: {
        totalUsers,
        totalAdmins,
        totalEvents,
        totalRegistrations,
        totalRevenue,
        merchandiseRevenue,
      },
      revenueData,
      recentUsers,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};