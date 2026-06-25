const { body } = require("express-validator");

const registerValidator = [
  body("fullName").notEmpty().withMessage("Full name is required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("gender")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),

  body("password").notEmpty().withMessage("Password required"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
