const scheduleService = require("../services/scheduleService");

/* -------------------------------------------------------------------------- */
/* Create Schedule                                                            */
/* -------------------------------------------------------------------------- */

const createSchedule = async (req, res) => {
  try {
    const schedule = await scheduleService.createScheduleService(req.body);

    return res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      schedule,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get All Schedules                                                          */
/* -------------------------------------------------------------------------- */

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedulesService();

    return res.status(200).json({
      success: true,
      message: "Schedules fetched successfully",
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Schedule By ID                                                         */
/* -------------------------------------------------------------------------- */

const getScheduleById = async (req, res) => {
  try {
    const schedule = await scheduleService.getScheduleByIdService(
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Schedule details fetched successfully",
      schedule,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Schedules                                                       */
/* -------------------------------------------------------------------------- */

const getSchedulesByDoctorId = async (req, res) => {
  try {
    const schedules = await scheduleService.getSchedulesByDoctorIdService(
      req.params.doctorId,
    );

    return res.status(200).json({
      success: true,
      message: "Doctor schedules fetched successfully",
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Update Schedule                                                            */
/* -------------------------------------------------------------------------- */

const updateSchedule = async (req, res) => {
  try {
    const schedule = await scheduleService.updateScheduleService(
      req.params.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      schedule,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Delete Schedule                                                            */
/* -------------------------------------------------------------------------- */

const deleteSchedule = async (req, res) => {
  try {
    await scheduleService.deleteScheduleService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  getSchedulesByDoctorId,
  updateSchedule,
  deleteSchedule,
};
