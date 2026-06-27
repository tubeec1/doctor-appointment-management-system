const pool = require("../config/db");

/* -------------------------------------------------------------------------- */
/* Create Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const createMedicalRecord = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO medical_records
    (
      appointment_id,
      diagnosis,
      prescription,
      doctor_notes
    )
    VALUES
    (?,?,?,?)
    `,
    [data.appointmentId, data.diagnosis, data.prescription, data.doctorNotes],
  );

  return result.insertId;
};

/* -------------------------------------------------------------------------- */
/* Get Medical Record By ID                                                   */
/* -------------------------------------------------------------------------- */

const getMedicalRecordById = async (recordId) => {
  const [rows] = await pool.query(
    `
SELECT

mr.id,
mr.diagnosis,
mr.prescription,
mr.doctor_notes,
mr.created_at,
mr.updated_at,

a.id AS appointment_id,
a.appointment_date,
a.status,

p.id AS patient_id,
pu.full_name AS patient_name,
pu.email AS patient_email,
pu.phone AS patient_phone,
pu.gender AS patient_gender,
pu.profile_image AS patient_profile_image,

d.id AS doctor_id,
du.full_name AS doctor_name,
du.email AS doctor_email,
du.phone AS doctor_phone,
du.profile_image AS doctor_profile_image,

d.specialization,
d.experience_years,
d.consultation_fee

FROM medical_records mr

INNER JOIN appointments a
ON mr.appointment_id = a.id

INNER JOIN patients p
ON a.patient_id = p.id

INNER JOIN users pu
ON p.user_id = pu.id

INNER JOIN doctors d
ON a.doctor_id = d.id

INNER JOIN users du
ON d.user_id = du.id

WHERE mr.id = ?
    `,
    [recordId],
  );

  return rows[0];
};

/* -------------------------------------------------------------------------- */
/* Get All Medical Records                                                    */
/* -------------------------------------------------------------------------- */

const getAllMedicalRecords = async () => {
  const [rows] = await pool.query(
    `
SELECT

mr.id,
mr.diagnosis,
mr.prescription,
mr.created_at,

a.appointment_date,
a.status,

pu.full_name AS patient_name,

du.full_name AS doctor_name,

d.specialization

FROM medical_records mr

INNER JOIN appointments a
ON mr.appointment_id = a.id

INNER JOIN patients p
ON a.patient_id = p.id

INNER JOIN users pu
ON p.user_id = pu.id

INNER JOIN doctors d
ON a.doctor_id = d.id

INNER JOIN users du
ON d.user_id = du.id

ORDER BY mr.id DESC
`,
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Get Medical Records By Patient                                             */
/* -------------------------------------------------------------------------- */

const getMedicalRecordsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
SELECT

mr.id,
mr.diagnosis,
mr.prescription,
mr.doctor_notes,
mr.created_at,

a.appointment_date,

du.full_name AS doctor_name,

d.specialization

FROM medical_records mr

INNER JOIN appointments a
ON mr.appointment_id = a.id

INNER JOIN doctors d
ON a.doctor_id = d.id

INNER JOIN users du
ON d.user_id = du.id

WHERE a.patient_id = ?

ORDER BY mr.id DESC
`,
    [patientId],
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Get Medical Records By Doctor                                              */
/* -------------------------------------------------------------------------- */

const getMedicalRecordsByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
SELECT

mr.id,
mr.diagnosis,
mr.prescription,
mr.doctor_notes,
mr.created_at,

a.appointment_date,

pu.full_name AS patient_name,
pu.gender,
pu.phone

FROM medical_records mr

INNER JOIN appointments a
ON mr.appointment_id = a.id

INNER JOIN patients p
ON a.patient_id = p.id

INNER JOIN users pu
ON p.user_id = pu.id

WHERE a.doctor_id = ?

ORDER BY mr.id DESC
`,
    [doctorId],
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Update Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const updateMedicalRecord = async (data) => {
  await pool.query(
    `
    UPDATE medical_records
    SET
      diagnosis=?,
      prescription=?,
      doctor_notes=?
    WHERE id=?
    `,
    [data.diagnosis, data.prescription, data.doctorNotes, data.recordId],
  );
};

/* -------------------------------------------------------------------------- */
/* Delete Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const deleteMedicalRecord = async (recordId) => {
  await pool.query(
    `
    DELETE FROM medical_records
    WHERE id = ?
    `,
    [recordId],
  );
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getAppointmentById = async (appointmentId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM appointments
    WHERE id = ?
    `,
    [appointmentId],
  );

  return rows[0];
};

const getPatientByUserId = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM patients
    WHERE user_id = ?
    `,
    [userId],
  );

  return rows[0];
};

const getDoctorByUserId = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM doctors
    WHERE user_id = ?
    `,
    [userId],
  );

  return rows[0];
};

const getMedicalRecordByAppointmentId = async (appointmentId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM medical_records
    WHERE appointment_id = ?
    `,
    [appointmentId],
  );

  return rows[0];
};

module.exports = {
  createMedicalRecord,
  getMedicalRecordById,
  getAllMedicalRecords,
  getMedicalRecordsByPatientId,
  getMedicalRecordsByDoctorId,
  updateMedicalRecord,
  deleteMedicalRecord,
  getAppointmentById,
  getPatientByUserId,
  getDoctorByUserId,
  getMedicalRecordByAppointmentId,
};
