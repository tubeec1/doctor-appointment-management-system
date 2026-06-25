const { validationResult } = require("express-validator");

const appointmentService = require("../services/appointmentService");

/* -------------------------------------------------------------------------- */
/* Create Appointment                                                         */
/* -------------------------------------------------------------------------- */

const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const appointment = await appointmentService.createAppointmentService(
      req.user.id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get All Appointments                                                       */
/* -------------------------------------------------------------------------- */

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointmentsService();

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Appointment By ID                                                      */
/* -------------------------------------------------------------------------- */

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointmentByIdService(
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Appointment details fetched successfully",
      appointment,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get My Appointments (Patient)                                              */
/* -------------------------------------------------------------------------- */

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getMyAppointmentsService(
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "My appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Appointments                                                    */
/* -------------------------------------------------------------------------- */

const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getDoctorAppointmentsService(
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Doctor appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Update Appointment Status                                                  */
/* -------------------------------------------------------------------------- */

const updateAppointmentStatus = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const appointment = await appointmentService.updateAppointmentStatusService(
      req.params.id,
      req.body.status,
    );

    return res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Cancel Appointment                                                         */
/* -------------------------------------------------------------------------- */

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.cancelAppointmentService(
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Delete Appointment                                                         */
/* -------------------------------------------------------------------------- */

const deleteAppointment = async (req, res) => {
  try {
    await appointmentService.deleteAppointmentService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment,
};
