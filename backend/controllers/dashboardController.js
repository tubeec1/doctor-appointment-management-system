const dashboardService = require("../services/dashboardService");

/* -------------------------------------------------------------------------- */
/* Admin Dashboard                                                            */
/* -------------------------------------------------------------------------- */

const getAdminDashboard = async (req, res) => {
  try {
    const statistics = await dashboardService.getAdminDashboardService();

    return res.status(200).json({
      success: true,
      message: "Admin dashboard fetched successfully",
      statistics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Doctor Dashboard                                                           */
/* -------------------------------------------------------------------------- */

const getDoctorDashboard = async (req, res) => {
  try {
    const statistics = await dashboardService.getDoctorDashboardService(
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Doctor dashboard fetched successfully",
      statistics,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Patient Dashboard                                                          */
/* -------------------------------------------------------------------------- */

const getPatientDashboard = async (req, res) => {
  try {
    const statistics = await dashboardService.getPatientDashboardService(
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Patient dashboard fetched successfully",
      statistics,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
  getDoctorDashboard,
  getPatientDashboard,
};
