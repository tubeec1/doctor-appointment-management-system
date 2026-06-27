const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

/* -------------------------------------------------------------------------- */
/* Appointment Report                                                         */
/* -------------------------------------------------------------------------- */
router.get(
  "/appointments",
  authMiddleware,
  roleMiddleware("Administrator"),
  reportController.getAppointmentReport,
);

/* -------------------------------------------------------------------------- */
/* Payment Report                                                             */
/* -------------------------------------------------------------------------- */
router.get(
  "/payments",
  authMiddleware,
  roleMiddleware("Administrator"),
  reportController.getPaymentReport,
);

/* -------------------------------------------------------------------------- */
/* Doctor Report                                                              */
/* -------------------------------------------------------------------------- */
router.get(
  "/doctors",
  authMiddleware,
  roleMiddleware("Administrator"),
  reportController.getDoctorReport,
);

/* -------------------------------------------------------------------------- */
/* Patient Report                                                             */
/* -------------------------------------------------------------------------- */
router.get(
  "/patients",
  authMiddleware,
  roleMiddleware("Administrator"),
  reportController.getPatientReport,
);

/* -------------------------------------------------------------------------- */
/* Medical Record Report                                                      */
/* -------------------------------------------------------------------------- */
router.get(
  "/medical-records",
  authMiddleware,
  roleMiddleware("Administrator"),
  reportController.getMedicalRecordReport,
);

module.exports = router;
