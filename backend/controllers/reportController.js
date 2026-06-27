const reportService = require("../services/reportService");

/* -------------------------------------------------------------------------- */
/* Appointment Report                                                         */
/* -------------------------------------------------------------------------- */

const getAppointmentReport = async (req, res) => {
  try {
    const report = await reportService.getAppointmentReportService();

    return res.status(200).json({
      success: true,
      message: "Appointment report fetched successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Payment Report                                                             */
/* -------------------------------------------------------------------------- */

const getPaymentReport = async (req, res) => {
  try {
    const report = await reportService.getPaymentReportService();

    return res.status(200).json({
      success: true,
      message: "Payment report fetched successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Doctor Report                                                              */
/* -------------------------------------------------------------------------- */

const getDoctorReport = async (req, res) => {
  try {
    const report = await reportService.getDoctorReportService();

    return res.status(200).json({
      success: true,
      message: "Doctor report fetched successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Patient Report                                                             */
/* -------------------------------------------------------------------------- */

const getPatientReport = async (req, res) => {
  try {
    const report = await reportService.getPatientReportService();

    return res.status(200).json({
      success: true,
      message: "Patient report fetched successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Medical Record Report                                                      */
/* -------------------------------------------------------------------------- */

const getMedicalRecordReport = async (req, res) => {
  try {
    const report = await reportService.getMedicalRecordReportService();

    return res.status(200).json({
      success: true,
      message: "Medical record report fetched successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAppointmentReport,
  getPaymentReport,
  getDoctorReport,
  getPatientReport,
  getMedicalRecordReport,
};
