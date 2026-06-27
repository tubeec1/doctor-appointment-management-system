const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const uploadReceiptImage = require("../middlewares/uploadReceiptImage");

const {
  createPaymentValidator,
  updatePaymentValidator,
} = require("../validators/paymentValidator");

/* -------------------------------------------------------------------------- */
/* Patient: Submit Payment                                                    */
/* -------------------------------------------------------------------------- */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Patient"),
  uploadReceiptImage,
  createPaymentValidator,
  paymentController.createPayment,
);

/* -------------------------------------------------------------------------- */
/* Patient: My Payments                                                       */
/* -------------------------------------------------------------------------- */
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("Patient"),
  paymentController.getMyPayments,
);

/* -------------------------------------------------------------------------- */
/* Admin: Get All Payments                                                    */
/* -------------------------------------------------------------------------- */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("Administrator"),
  paymentController.getAllPayments,
);

/* -------------------------------------------------------------------------- */
/* Admin: Get Payment Details                                                 */
/* -------------------------------------------------------------------------- */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  paymentController.getPaymentById,
);

/* -------------------------------------------------------------------------- */
/* Admin: Verify / Update Payment                                             */
/* -------------------------------------------------------------------------- */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  updatePaymentValidator,
  paymentController.updatePayment,
);

/* -------------------------------------------------------------------------- */
/* Admin: Delete Payment                                                      */
/* -------------------------------------------------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  paymentController.deletePayment,
);

module.exports = router;
