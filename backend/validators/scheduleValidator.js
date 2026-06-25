const { body } = require("express-validator");

/* -------------------------------------------------------------------------- */
/* Create Schedule Validator                                                  */
/* -------------------------------------------------------------------------- */

const createScheduleValidator = [
  body("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isInt()
    .withMessage("Doctor ID must be a number"),

  body("dayOfWeek")
    .notEmpty()
    .withMessage("Day of week is required")
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
    .withMessage("Invalid day of week"),

  body("startTime").notEmpty().withMessage("Start time is required"),

  body("endTime").notEmpty().withMessage("End time is required"),
];

/* -------------------------------------------------------------------------- */
/* Update Schedule Validator                                                  */
/* -------------------------------------------------------------------------- */

const updateScheduleValidator = [
  body("doctorId").optional().isInt().withMessage("Doctor ID must be a number"),

  body("dayOfWeek")
    .optional()
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
    .withMessage("Invalid day of week"),

  body("startTime").optional(),

  body("endTime").optional(),
];

module.exports = {
  createScheduleValidator,
  updateScheduleValidator,
};
