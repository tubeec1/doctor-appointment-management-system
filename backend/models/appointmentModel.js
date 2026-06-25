const pool = require("../config/db");

/* -------------------------------------------------------------------------- */
/* Create Appointment                                                         */
/* -------------------------------------------------------------------------- */

const createAppointment = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO appointments
    (
      patient_id,
      doctor_id,
      schedule_id,
      appointment_date,
      status,
      notes
    )
    VALUES
    (?,?,?,?,?,?)
    `,
    [
      data.patientId,
      data.doctorId,
      data.scheduleId,
      data.appointmentDate,
      "Pending",
      data.notes || null,
    ],
  );

  return result.insertId;
};

/* -------------------------------------------------------------------------- */
/* Get Appointment By ID                                                      */
/* -------------------------------------------------------------------------- */

const getAppointmentById = async (appointmentId) => {
  const [rows] = await pool.query(
    `
SELECT

a.id,
a.appointment_date,
a.status,
a.notes,
a.created_at,
a.updated_at,

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

doc.specialization,
doc.experience_years,
doc.consultation_fee,

s.id AS schedule_id,
s.day_of_week,
s.start_time,
s.end_time

FROM appointments a

INNER JOIN patients p
ON a.patient_id = p.id

INNER JOIN users pu
ON p.user_id = pu.id

INNER JOIN doctors doc
ON a.doctor_id = doc.id

INNER JOIN users du
ON doc.user_id = du.id

INNER JOIN schedules s
ON a.schedule_id = s.id

INNER JOIN doctors d
ON d.id = a.doctor_id

WHERE a.id = ?
`,
    [appointmentId],
  );

  return rows[0];
};

/* -------------------------------------------------------------------------- */
/* Get All Appointments                                                       */
/* -------------------------------------------------------------------------- */

const getAllAppointments = async () => {
  const [rows] = await pool.query(
    `
SELECT

a.id,
a.appointment_date,
a.status,
a.notes,
a.created_at,

pu.full_name AS patient_name,
pu.phone AS patient_phone,

du.full_name AS doctor_name,

doc.specialization,

s.day_of_week,
s.start_time,
s.end_time

FROM appointments a

INNER JOIN patients p
ON a.patient_id = p.id

INNER JOIN users pu
ON p.user_id = pu.id

INNER JOIN doctors doc
ON a.doctor_id = doc.id

INNER JOIN users du
ON doc.user_id = du.id

INNER JOIN schedules s
ON a.schedule_id = s.id

ORDER BY a.id DESC
`,
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Get Patient Appointments                                                   */
/* -------------------------------------------------------------------------- */

const getAppointmentsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
SELECT

a.id,
a.appointment_date,
a.status,
a.notes,
a.created_at,

du.full_name AS doctor_name,
doc.specialization,
doc.consultation_fee,

s.day_of_week,
s.start_time,
s.end_time

FROM appointments a

INNER JOIN doctors doc
ON a.doctor_id = doc.id

INNER JOIN users du
ON doc.user_id = du.id

INNER JOIN schedules s
ON a.schedule_id = s.id

WHERE a.patient_id = ?

ORDER BY a.id DESC
`,
    [patientId],
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Appointments                                                    */
/* -------------------------------------------------------------------------- */

const getAppointmentsByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
SELECT

a.id,
a.appointment_date,
a.status,
a.notes,
a.created_at,

pu.full_name AS patient_name,
pu.phone AS patient_phone,
pu.gender AS patient_gender,

s.day_of_week,
s.start_time,
s.end_time

FROM appointments a

INNER JOIN patients p
ON a.patient_id = p.id

INNER JOIN users pu
ON p.user_id = pu.id

INNER JOIN schedules s
ON a.schedule_id = s.id

WHERE a.doctor_id = ?

ORDER BY a.id DESC
`,
    [doctorId],
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Update Appointment Status                                                  */
/* -------------------------------------------------------------------------- */

const updateAppointmentStatus = async (appointmentId, status) => {
  await pool.query(
    `
    UPDATE appointments
    SET status = ?
    WHERE id = ?
    `,
    [status, appointmentId],
  );
};

/* -------------------------------------------------------------------------- */
/* Cancel Appointment                                                         */
/* -------------------------------------------------------------------------- */

const cancelAppointment = async (appointmentId) => {
  await pool.query(
    `
    UPDATE appointments
    SET status = 'Cancelled'
    WHERE id = ?
    `,
    [appointmentId],
  );
};

/* -------------------------------------------------------------------------- */
/* Delete Appointment                                                         */
/* -------------------------------------------------------------------------- */

const deleteAppointment = async (appointmentId) => {
  await pool.query(
    `
    DELETE FROM appointments
    WHERE id = ?
    `,
    [appointmentId],
  );
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

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

module.exports = {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment,
  getPatientByUserId,
  getDoctorByUserId,
};
