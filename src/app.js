const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const merchandiseRoutes = require("./routes/merchandiseRoutes");

const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");
const superRoutes = require("./routes/superRoutes");
const app = express();

/* ✅ CORS FIX */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(morgan("dev"));

/* HEALTH */
app.get("/", (req, res) => res.send("API Running"));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ✅ FIXED MERCHANDISE ROUTE */
app.use("/api/merchandise", merchandiseRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/super", superRoutes);

module.exports = app;