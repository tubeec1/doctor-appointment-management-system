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
/* Create Payment Validator                                                   */
/* -------------------------------------------------------------------------- */

const createPaymentValidator = [
  body("appointmentId")
    .notEmpty()
    .withMessage("Appointment ID is required")
    .isInt({ min: 1 })
    .withMessage("Appointment ID must be a valid integer"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["Cash", "EVC Plus", "Sahal", "Premier Bank", "Zaad", "Salaam Bank"])
    .withMessage("Invalid payment method"),

  validate,
];

/* -------------------------------------------------------------------------- */
/* Update Payment Validator                                                   */
/* -------------------------------------------------------------------------- */

const updatePaymentValidator = [
  body("amount")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0"),

  body("paymentMethod")
    .optional()
    .trim()
    .isIn(["Cash", "EVC Plus", "Sahal", "Premier Bank", "Zaad", "Salaam Bank"])
    .withMessage("Invalid payment method"),

  body("paymentStatus")
    .optional()
    .isIn(["Pending", "Paid", "Rejected"])
    .withMessage("Invalid payment status"),

  validate,
];

module.exports = {
  createPaymentValidator,
  updatePaymentValidator,
};
