const scheduleModel = require("../models/scheduleModel");

/* -------------------------------------------------------------------------- */
/* Create Schedule                                                            */
/* -------------------------------------------------------------------------- */

const createScheduleService = async (data) => {
  const scheduleId = await scheduleModel.createSchedule(data);

  const schedule = await scheduleModel.getScheduleById(scheduleId);

  return schedule;
};

/* -------------------------------------------------------------------------- */
/* Get All Schedules                                                          */
/* -------------------------------------------------------------------------- */

const getAllSchedulesService = async () => {
  return await scheduleModel.getAllSchedules();
};

/* -------------------------------------------------------------------------- */
/* Get Schedule By ID                                                         */
/* -------------------------------------------------------------------------- */

const getScheduleByIdService = async (id) => {
  const schedule = await scheduleModel.getScheduleById(id);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  return schedule;
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Schedules                                                       */
/* -------------------------------------------------------------------------- */

const getSchedulesByDoctorIdService = async (doctorId) => {
  return await scheduleModel.getSchedulesByDoctorId(doctorId);
};

/* -------------------------------------------------------------------------- */
/* Update Schedule                                                            */
/* -------------------------------------------------------------------------- */

const updateScheduleService = async (id, data) => {
  const existing = await scheduleModel.getScheduleById(id);

  if (!existing) {
    throw new Error("Schedule not found");
  }

  await scheduleModel.updateSchedule(id, data);

  return await scheduleModel.getScheduleById(id);
};

/* -------------------------------------------------------------------------- */
/* Delete Schedule                                                            */
/* -------------------------------------------------------------------------- */

const deleteScheduleService = async (id) => {
  const existing = await scheduleModel.getScheduleById(id);

  if (!existing) {
    throw new Error("Schedule not found");
  }

  await scheduleModel.deleteSchedule(id);

  return true;
};

module.exports = {
  createScheduleService,
  getAllSchedulesService,
  getScheduleByIdService,
  getSchedulesByDoctorIdService,
  updateScheduleService,
  deleteScheduleService,
};
