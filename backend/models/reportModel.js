const pool = require("../config/db");

/* -------------------------------------------------------------------------- */
/* Appointment Report                                                         */
/* -------------------------------------------------------------------------- */

const getAppointmentReport = async () => {
  const [rows] = await pool.query(`
SELECT

a.id,
a.appointment_date,
a.status,
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

ORDER BY a.appointment_date DESC
`);

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Payment Report                                                             */
/* -------------------------------------------------------------------------- */

const getPaymentReport = async () => {
  const [rows] = await pool.query(`
SELECT

pay.id,
pay.amount,
pay.payment_method,
pay.payment_status,
pay.payment_date,

pu.full_name AS patient_name,

du.full_name AS doctor_name,

doc.specialization

FROM payments pay

INNER JOIN appointments a
ON pay.appointment_id = a.id

INNER JOIN patients p
ON a.patient_id = p.id

INNER JOIN users pu
ON p.user_id = pu.id

INNER JOIN doctors doc
ON a.doctor_id = doc.id

INNER JOIN users du
ON doc.user_id = du.id

ORDER BY pay.payment_date DESC
`);

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Doctor Report                                                              */
/* -------------------------------------------------------------------------- */

const getDoctorReport = async () => {
  const [rows] = await pool.query(`
SELECT

d.id,

u.full_name,
u.email,
u.phone,

d.specialization,
d.experience_years,
d.consultation_fee,

COUNT(a.id) AS total_appointments,

SUM(
CASE
WHEN a.status='Completed'
THEN 1
ELSE 0
END
) AS completed_appointments,

SUM(
CASE
WHEN a.status='Cancelled'
THEN 1
ELSE 0
END
) AS cancelled_appointments,

IFNULL(SUM(pay.amount),0) AS total_revenue

FROM doctors d

INNER JOIN users u
ON d.user_id=u.id

LEFT JOIN appointments a
ON d.id=a.doctor_id

LEFT JOIN payments pay
ON a.id=pay.appointment_id
AND pay.payment_status='Paid'

GROUP BY d.id

ORDER BY u.full_name
`);

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Patient Report                                                             */
/* -------------------------------------------------------------------------- */

const getPatientReport = async () => {
  const [rows] = await pool.query(`
SELECT

p.id,

u.full_name,
u.email,
u.phone,
u.gender,

COUNT(a.id) AS total_appointments,

SUM(
CASE
WHEN a.status='Completed'
THEN 1
ELSE 0
END
) AS completed_appointments,

COUNT(pay.id) AS total_payments

FROM patients p

INNER JOIN users u
ON p.user_id=u.id

LEFT JOIN appointments a
ON p.id=a.patient_id

LEFT JOIN payments pay
ON a.id=pay.appointment_id

GROUP BY p.id

ORDER BY u.full_name
`);

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Medical Record Report                                                      */
/* -------------------------------------------------------------------------- */

const getMedicalRecordReport = async () => {
  const [rows] = await pool.query(`
SELECT

mr.id,
mr.diagnosis,
mr.prescription,
mr.created_at,

a.appointment_date,

pu.full_name AS patient_name,

du.full_name AS doctor_name,

doc.specialization

FROM medical_records mr

INNER JOIN appointments a
ON mr.appointment_id=a.id

INNER JOIN patients p
ON a.patient_id=p.id

INNER JOIN users pu
ON p.user_id=pu.id

INNER JOIN doctors doc
ON a.doctor_id=doc.id

INNER JOIN users du
ON doc.user_id=du.id

ORDER BY mr.created_at DESC
`);

  return rows;
};

module.exports = {
  getAppointmentReport,
  getPaymentReport,
  getDoctorReport,
  getPatientReport,
  getMedicalRecordReport,
};
