const dashboardModel = require("../models/dashboardModel");

/* -------------------------------------------------------------------------- */
/* Admin Dashboard                                                            */
/* -------------------------------------------------------------------------- */

const getAdminDashboardService = async () => {
  return await dashboardModel.getAdminStatistics();
};

/* -------------------------------------------------------------------------- */
/* Doctor Dashboard                                                           */
/* -------------------------------------------------------------------------- */

const getDoctorDashboardService = async (userId) => {
  const doctor = await dashboardModel.getDoctorByUserId(userId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return await dashboardModel.getDoctorStatistics(doctor.id);
};

/* -------------------------------------------------------------------------- */
/* Patient Dashboard                                                          */
/* -------------------------------------------------------------------------- */

const getPatientDashboardService = async (userId) => {
  const patient = await dashboardModel.getPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return await dashboardModel.getPatientStatistics(patient.id);
};

module.exports = {
  getAdminDashboardService,
  getDoctorDashboardService,
  getPatientDashboardService,
};
