const { body, param } = require("express-validator");

/* -------------------------------------------------------------------------- */
/* Create Appointment                                                         */
/* -------------------------------------------------------------------------- */

const createAppointmentValidator = [
  body("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isInt()
    .withMessage("Doctor ID must be a number"),

  body("scheduleId")
    .notEmpty()
    .withMessage("Schedule ID is required")
    .isInt()
    .withMessage("Schedule ID must be a number"),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isDate()
    .withMessage("Invalid appointment date"),

  body("notes")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters"),
];

/* -------------------------------------------------------------------------- */
/* Update Appointment Status                                                  */
/* -------------------------------------------------------------------------- */

const updateAppointmentStatusValidator = [
  param("id").isInt().withMessage("Appointment ID must be a number"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Approved", "Completed", "Cancelled"])
    .withMessage("Status must be Approved, Completed or Cancelled"),
];

/* -------------------------------------------------------------------------- */
/* Appointment ID Validator                                                   */
/* -------------------------------------------------------------------------- */

const appointmentIdValidator = [
  param("id").isInt().withMessage("Appointment ID must be a number"),
];

module.exports = {
  createAppointmentValidator,
  updateAppointmentStatusValidator,
  appointmentIdValidator,
};
