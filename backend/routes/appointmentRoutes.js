const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createAppointmentValidator,
  updateAppointmentStatusValidator,
  appointmentIdValidator,
} = require("../validators/appointmentValidator");

/* -------------------------------------------------------------------------- */
/* Patient Routes                                                             */
/* -------------------------------------------------------------------------- */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Patient"),
  createAppointmentValidator,
  appointmentController.createAppointment,
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("Patient"),
  appointmentController.getMyAppointments,
);

router.put(
  "/cancel/:id",
  authMiddleware,
  roleMiddleware("Patient"),
  appointmentIdValidator,
  appointmentController.cancelAppointment,
);

/* -------------------------------------------------------------------------- */
/* Doctor Routes                                                              */
/* -------------------------------------------------------------------------- */

router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("Doctor"),
  appointmentController.getDoctorAppointments,
);

router.put(
  "/status/:id",
  authMiddleware,
  roleMiddleware("Doctor", "Administrator"),
  updateAppointmentStatusValidator,
  appointmentController.updateAppointmentStatus,
);

/* -------------------------------------------------------------------------- */
/* Admin Routes                                                               */
/* -------------------------------------------------------------------------- */

router.get(
  "/",
  authMiddleware,
  roleMiddleware("Administrator"),
  appointmentController.getAllAppointments,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  appointmentIdValidator,
  appointmentController.deleteAppointment,
);

/* -------------------------------------------------------------------------- */
/* Shared Routes                                                              */
/* -------------------------------------------------------------------------- */

router.get(
  "/:id",
  authMiddleware,
  appointmentIdValidator,
  appointmentController.getAppointmentById,
);

module.exports = router;
