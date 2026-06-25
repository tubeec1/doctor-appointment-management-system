const { body } = require("express-validator");

const createDoctorValidator = [
  body("fullName").notEmpty().withMessage("Full name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("gender")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),

  body("specialization").notEmpty().withMessage("Specialization is required"),
];

const updateDoctorValidator = [
  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),

  body("experienceYears")
    .optional()
    .isNumeric()
    .withMessage("Experience years must be numeric"),

  body("consultationFee")
    .optional()
    .isNumeric()
    .withMessage("Consultation fee must be numeric"),
];

module.exports = {
  createDoctorValidator,
  updateDoctorValidator,
};
