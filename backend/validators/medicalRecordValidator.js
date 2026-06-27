const { body, validationResult } = require("express-validator");

/* -------------------------------------------------------------------------- */
/* Validation Middleware                                                      */
/* -------------------------------------------------------------------------- */

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

/* -------------------------------------------------------------------------- */
/* Create Medical Record Validator                                            */
/* -------------------------------------------------------------------------- */

const createMedicalRecordValidator = [
  body("appointmentId")
    .notEmpty()
    .withMessage("Appointment ID is required")
    .isInt({ min: 1 })
    .withMessage("Appointment ID must be a valid integer"),

  body("diagnosis").trim().notEmpty().withMessage("Diagnosis is required"),

  body("prescription")
    .trim()
    .notEmpty()
    .withMessage("Prescription is required"),

  body("doctorNotes").optional().trim(),

  validate,
];

/* -------------------------------------------------------------------------- */
/* Update Medical Record Validator                                            */
/* -------------------------------------------------------------------------- */

const updateMedicalRecordValidator = [
  body("diagnosis")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Diagnosis cannot be empty"),

  body("prescription")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Prescription cannot be empty"),

  body("doctorNotes").optional().trim(),

  validate,
];

module.exports = {
  createMedicalRecordValidator,
  updateMedicalRecordValidator,
};
