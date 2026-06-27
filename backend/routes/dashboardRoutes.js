const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

/* -------------------------------------------------------------------------- */
/* Admin Dashboard                                                            */
/* -------------------------------------------------------------------------- */
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("Administrator"),
  dashboardController.getAdminDashboard,
);

/* -------------------------------------------------------------------------- */
/* Doctor Dashboard                                                           */
/* -------------------------------------------------------------------------- */
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("Doctor"),
  dashboardController.getDoctorDashboard,
);

/* -------------------------------------------------------------------------- */
/* Patient Dashboard                                                          */
/* -------------------------------------------------------------------------- */
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("Patient"),
  dashboardController.getPatientDashboard,
);

module.exports = router;
