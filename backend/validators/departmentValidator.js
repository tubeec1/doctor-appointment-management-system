const { body } = require("express-validator");

/* -------------------------------------------------------------------------- */
/* Create Department                                                          */
/* -------------------------------------------------------------------------- */

const createDepartmentValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters"),

  body("description").optional().trim(),
];

/* -------------------------------------------------------------------------- */
/* Update Department                                                          */
/* -------------------------------------------------------------------------- */

const updateDepartmentValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters"),

  body("description").optional().trim(),
];

/* -------------------------------------------------------------------------- */
/* Assign Doctor To Department                                                */
/* -------------------------------------------------------------------------- */

const assignDoctorValidator = [
  body("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isInt({ min: 1 })
    .withMessage("Doctor ID must be a valid integer"),

  body("departmentId")
    .notEmpty()
    .withMessage("Department ID is required")
    .isInt({ min: 1 })
    .withMessage("Department ID must be a valid integer"),
];

module.exports = {
  createDepartmentValidator,
  updateDepartmentValidator,
  assignDoctorValidator,
};
