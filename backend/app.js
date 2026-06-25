const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const doctorRoutes = require("./routes/doctorRoute");
const appointmentRoutes = require("./routes/appointmentRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Doctor Appointment Management API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/schedules", scheduleRoutes);

module.exports = app;
