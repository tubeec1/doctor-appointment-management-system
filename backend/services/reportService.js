const reportModel = require("../models/reportModel");

/* -------------------------------------------------------------------------- */
/* Appointment Report                                                         */
/* -------------------------------------------------------------------------- */

const getAppointmentReportService = async () => {
  return await reportModel.getAppointmentReport();
};

/* -------------------------------------------------------------------------- */
/* Payment Report                                                             */
/* -------------------------------------------------------------------------- */

const getPaymentReportService = async () => {
  return await reportModel.getPaymentReport();
};

/* -------------------------------------------------------------------------- */
/* Doctor Report                                                              */
/* -------------------------------------------------------------------------- */

const getDoctorReportService = async () => {
  return await reportModel.getDoctorReport();
};

/* -------------------------------------------------------------------------- */
/* Patient Report                                                             */
/* -------------------------------------------------------------------------- */

const getPatientReportService = async () => {
  return await reportModel.getPatientReport();
};

/* -------------------------------------------------------------------------- */
/* Medical Record Report                                                      */
/* -------------------------------------------------------------------------- */

const getMedicalRecordReportService = async () => {
  return await reportModel.getMedicalRecordReport();
};

module.exports = {
  getAppointmentReportService,
  getPaymentReportService,
  getDoctorReportService,
  getPatientReportService,
  getMedicalRecordReportService,
};
