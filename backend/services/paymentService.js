const paymentModel = require("../models/paymentModel");

/* -------------------------------------------------------------------------- */
/* Create Payment (Patient)                                                   */
/* -------------------------------------------------------------------------- */

const createPaymentService = async (userId, body, receiptImage) => {
  const patient = await paymentModel.getPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const appointment = await paymentModel.getAppointmentById(body.appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.patient_id !== patient.id) {
    throw new Error("You can only pay for your own appointment");
  }

  const existingPayment = await paymentModel.getPaymentByAppointmentId(
    body.appointmentId,
  );

  if (existingPayment) {
    throw new Error("Payment already submitted for this appointment");
  }

  const paymentId = await paymentModel.createPayment({
    appointmentId: body.appointmentId,
    amount: body.amount,
    receiptImage,
    paymentMethod: body.paymentMethod,
  });

  return await paymentModel.getPaymentById(paymentId);
};

/* -------------------------------------------------------------------------- */
/* Get Payment By ID (Admin)                                                  */
/* -------------------------------------------------------------------------- */

const getPaymentByIdService = async (paymentId) => {
  const payment = await paymentModel.getPaymentById(paymentId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};

/* -------------------------------------------------------------------------- */
/* Get All Payments (Admin)                                                   */
/* -------------------------------------------------------------------------- */

const getAllPaymentsService = async () => {
  return await paymentModel.getAllPayments();
};

/* -------------------------------------------------------------------------- */
/* Get My Payments (Patient)                                                  */
/* -------------------------------------------------------------------------- */

const getMyPaymentsService = async (userId) => {
  const patient = await paymentModel.getPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return await paymentModel.getPaymentsByPatientId(patient.id);
};

/* -------------------------------------------------------------------------- */
/* Update Payment (Admin)                                                     */
/* -------------------------------------------------------------------------- */

const updatePaymentService = async (paymentId, adminUserId, body) => {
  const payment = await paymentModel.getPaymentById(paymentId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  await paymentModel.updatePayment(paymentId, {
    amount: body.amount,
    paymentMethod: body.paymentMethod,
    paymentStatus: body.paymentStatus,
    verifiedBy: adminUserId,
  });

  return await paymentModel.getPaymentById(paymentId);
};

/* -------------------------------------------------------------------------- */
/* Delete Payment (Admin)                                                     */
/* -------------------------------------------------------------------------- */

const deletePaymentService = async (paymentId) => {
  const payment = await paymentModel.getPaymentById(paymentId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  await paymentModel.deletePayment(paymentId);
};

module.exports = {
  createPaymentService,
  getPaymentByIdService,
  getAllPaymentsService,
  getMyPaymentsService,
  updatePaymentService,
  deletePaymentService,
};
