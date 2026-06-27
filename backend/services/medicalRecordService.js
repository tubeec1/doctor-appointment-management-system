const medicalRecordModel = require("../models/medicalRecordModel");

/* -------------------------------------------------------------------------- */
/* Create Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const createMedicalRecordService = async (userId, body) => {
  const doctor = await medicalRecordModel.getDoctorByUserId(userId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const appointment = await medicalRecordModel.getAppointmentById(
    body.appointmentId,
  );

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.doctor_id !== doctor.id) {
    throw new Error("You are not allowed to create this medical record");
  }

  if (appointment.status !== "Completed") {
    throw new Error(
      "Medical record can only be created for completed appointments",
    );
  }

  const existingRecord =
    await medicalRecordModel.getMedicalRecordByAppointmentId(
      body.appointmentId,
    );

  if (existingRecord) {
    throw new Error("Medical record already exists for this appointment");
  }

  const recordId = await medicalRecordModel.createMedicalRecord({
    appointmentId: body.appointmentId,
    diagnosis: body.diagnosis,
    prescription: body.prescription,
    doctorNotes: body.doctorNotes,
  });

  return await medicalRecordModel.getMedicalRecordById(recordId);
};

/* -------------------------------------------------------------------------- */
/* Get All Medical Records                                                    */
/* -------------------------------------------------------------------------- */

const getAllMedicalRecordsService = async () => {
  return await medicalRecordModel.getAllMedicalRecords();
};

/* -------------------------------------------------------------------------- */
/* Get Medical Record By ID                                                   */
/* -------------------------------------------------------------------------- */

const getMedicalRecordByIdService = async (recordId) => {
  const record = await medicalRecordModel.getMedicalRecordById(recordId);

  if (!record) {
    throw new Error("Medical record not found");
  }

  return record;
};

/* -------------------------------------------------------------------------- */
/* Get Patient Medical Records                                                */
/* -------------------------------------------------------------------------- */

const getPatientMedicalRecordsService = async (userId) => {
  const patient = await medicalRecordModel.getPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return await medicalRecordModel.getMedicalRecordsByPatientId(patient.id);
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Medical Records                                                 */
/* -------------------------------------------------------------------------- */

const getDoctorMedicalRecordsService = async (userId) => {
  const doctor = await medicalRecordModel.getDoctorByUserId(userId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return await medicalRecordModel.getMedicalRecordsByDoctorId(doctor.id);
};

/* -------------------------------------------------------------------------- */
/* Update Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const updateMedicalRecordService = async (userId, recordId, body) => {
  const doctor = await medicalRecordModel.getDoctorByUserId(userId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const record = await medicalRecordModel.getMedicalRecordById(recordId);

  if (!record) {
    throw new Error("Medical record not found");
  }

  if (record.doctor_id !== doctor.id) {
    throw new Error("You are not allowed to update this medical record");
  }

  await medicalRecordModel.updateMedicalRecord({
    recordId,
    diagnosis: body.diagnosis,
    prescription: body.prescription,
    doctorNotes: body.doctorNotes,
  });

  return await medicalRecordModel.getMedicalRecordById(recordId);
};

/* -------------------------------------------------------------------------- */
/* Delete Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const deleteMedicalRecordService = async (recordId) => {
  const record = await medicalRecordModel.getMedicalRecordById(recordId);

  if (!record) {
    throw new Error("Medical record not found");
  }

  await medicalRecordModel.deleteMedicalRecord(recordId);
};

module.exports = {
  createMedicalRecordService,
  getAllMedicalRecordsService,
  getMedicalRecordByIdService,
  getPatientMedicalRecordsService,
  getDoctorMedicalRecordsService,
  updateMedicalRecordService,
  deleteMedicalRecordService,
};
