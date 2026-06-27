const paymentService = require("../services/paymentService");

/* -------------------------------------------------------------------------- */
/* Create Payment (Patient)                                                   */
/* -------------------------------------------------------------------------- */

const createPayment = async (req, res) => {
  try {
    const receiptImage = req.file ? req.file.path : null;

    const payment = await paymentService.createPaymentService(
      req.user.id,
      req.body,
      receiptImage,
    );

    return res.status(201).json({
      success: true,
      message: "Payment submitted successfully",
      payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Payment By ID (Admin)                                                  */
/* -------------------------------------------------------------------------- */

const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Payment details fetched successfully",
      payment,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get All Payments (Admin)                                                   */
/* -------------------------------------------------------------------------- */

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPaymentsService();

    return res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get My Payments (Patient)                                                  */
/* -------------------------------------------------------------------------- */

const getMyPayments = async (req, res) => {
  try {
    const payments = await paymentService.getMyPaymentsService(req.user.id);

    return res.status(200).json({
      success: true,
      message: "My payments fetched successfully",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Update Payment (Admin)                                                     */
/* -------------------------------------------------------------------------- */

const updatePayment = async (req, res) => {
  try {
    const payment = await paymentService.updatePaymentService(
      req.params.id,
      req.user.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Delete Payment (Admin)                                                     */
/* -------------------------------------------------------------------------- */

const deletePayment = async (req, res) => {
  try {
    await paymentService.deletePaymentService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getAllPayments,
  getMyPayments,
  updatePayment,
  deletePayment,
};
