const appointmentModel = require("../models/appointmentModel");

/* -------------------------------------------------------------------------- */
/* Create Appointment                                                         */
/* -------------------------------------------------------------------------- */

const createAppointmentService = async (userId, data) => {
  const patient = await appointmentModel.getPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const appointmentId = await appointmentModel.createAppointment({
    patientId: patient.id,
    doctorId: data.doctorId,
    scheduleId: data.scheduleId,
    appointmentDate: data.appointmentDate,
    notes: data.notes,
  });

  const appointment = await appointmentModel.getAppointmentById(appointmentId);

  return appointment;
};

/* -------------------------------------------------------------------------- */
/* Get All Appointments                                                       */
/* -------------------------------------------------------------------------- */

const getAllAppointmentsService = async () => {
  return await appointmentModel.getAllAppointments();
};

/* -------------------------------------------------------------------------- */
/* Get Appointment By ID                                                      */
/* -------------------------------------------------------------------------- */

const getAppointmentByIdService = async (appointmentId) => {
  const appointment = await appointmentModel.getAppointmentById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
};

/* -------------------------------------------------------------------------- */
/* Get My Appointments (Patient)                                               */
/* -------------------------------------------------------------------------- */

const getMyAppointmentsService = async (userId) => {
  const patient = await appointmentModel.getPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return await appointmentModel.getAppointmentsByPatientId(patient.id);
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Appointments                                                     */
/* -------------------------------------------------------------------------- */

const getDoctorAppointmentsService = async (userId) => {
  const doctor = await appointmentModel.getDoctorByUserId(userId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return await appointmentModel.getAppointmentsByDoctorId(doctor.id);
};

/* -------------------------------------------------------------------------- */
/* Update Appointment Status                                                  */
/* -------------------------------------------------------------------------- */

const updateAppointmentStatusService = async (appointmentId, status) => {
  const appointment = await appointmentModel.getAppointmentById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  await appointmentModel.updateAppointmentStatus(appointmentId, status);

  return await appointmentModel.getAppointmentById(appointmentId);
};

/* -------------------------------------------------------------------------- */
/* Cancel Appointment                                                         */
/* -------------------------------------------------------------------------- */

const cancelAppointmentService = async (appointmentId) => {
  const appointment = await appointmentModel.getAppointmentById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  await appointmentModel.cancelAppointment(appointmentId);

  return await appointmentModel.getAppointmentById(appointmentId);
};

/* -------------------------------------------------------------------------- */
/* Delete Appointment                                                         */
/* -------------------------------------------------------------------------- */

const deleteAppointmentService = async (appointmentId) => {
  const appointment = await appointmentModel.getAppointmentById(appointmentId);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  await appointmentModel.deleteAppointment(appointmentId);

  return true;
};

module.exports = {
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService,
  getMyAppointmentsService,
  getDoctorAppointmentsService,
  updateAppointmentStatusService,
  cancelAppointmentService,
  deleteAppointmentService,
};
