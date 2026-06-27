const pool = require("../config/db");

/* -------------------------------------------------------------------------- */
/* Admin Dashboard                                                            */
/* -------------------------------------------------------------------------- */

const getAdminStatistics = async () => {
  const [[statistics]] = await pool.query(`
SELECT
    (SELECT COUNT(*) FROM patients) AS totalPatients,

    (SELECT COUNT(*) FROM doctors) AS totalDoctors,

    (SELECT COUNT(*) FROM appointments) AS totalAppointments,

    (SELECT COUNT(*) FROM appointments
        WHERE status='Pending') AS pendingAppointments,

    (SELECT COUNT(*) FROM appointments
        WHERE status='Approved') AS approvedAppointments,

    (SELECT COUNT(*) FROM appointments
        WHERE status='Completed') AS completedAppointments,

    (SELECT COUNT(*) FROM appointments
        WHERE status='Cancelled') AS cancelledAppointments,

    (SELECT COUNT(*) FROM departments) AS totalDepartments,

    (SELECT COUNT(*) FROM medical_records) AS totalMedicalRecords,

    (SELECT COUNT(*) FROM payments) AS totalPayments,

    (SELECT COUNT(*) FROM payments
        WHERE payment_status='Pending') AS pendingPayments,

    (SELECT COUNT(*) FROM payments
        WHERE payment_status='Paid') AS paidPayments,

    (SELECT IFNULL(SUM(amount),0)
        FROM payments
        WHERE payment_status='Paid') AS totalRevenue
`);

  return statistics;
};

/* -------------------------------------------------------------------------- */
/* Doctor Dashboard                                                           */
/* -------------------------------------------------------------------------- */

const getDoctorStatistics = async (doctorId) => {
  const [[statistics]] = await pool.query(
    `
SELECT

(SELECT COUNT(*)
 FROM appointments
 WHERE doctor_id=?) AS appointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE doctor_id=? AND status='Pending') AS pendingAppointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE doctor_id=? AND status='Approved') AS approvedAppointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE doctor_id=? AND status='Completed') AS completedAppointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE doctor_id=? AND status='Cancelled') AS cancelledAppointments,

(SELECT COUNT(*)
 FROM medical_records mr
 INNER JOIN appointments a
 ON mr.appointment_id=a.id
 WHERE a.doctor_id=?) AS medicalRecords,

(SELECT IFNULL(SUM(p.amount),0)
 FROM payments p
 INNER JOIN appointments a
 ON p.appointment_id=a.id
 WHERE a.doctor_id=?
 AND p.payment_status='Paid') AS earnings
`,
    [doctorId, doctorId, doctorId, doctorId, doctorId, doctorId, doctorId],
  );

  return statistics;
};

/* -------------------------------------------------------------------------- */
/* Patient Dashboard                                                          */
/* -------------------------------------------------------------------------- */

const getPatientStatistics = async (patientId) => {
  const [[statistics]] = await pool.query(
    `
SELECT

(SELECT COUNT(*)
 FROM appointments
 WHERE patient_id=?) AS appointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE patient_id=? AND status='Pending') AS pendingAppointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE patient_id=? AND status='Approved') AS approvedAppointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE patient_id=? AND status='Completed') AS completedAppointments,

(SELECT COUNT(*)
 FROM appointments
 WHERE patient_id=? AND status='Cancelled') AS cancelledAppointments,

(SELECT COUNT(*)
 FROM medical_records mr
 INNER JOIN appointments a
 ON mr.appointment_id=a.id
 WHERE a.patient_id=?) AS medicalRecords,

(SELECT COUNT(*)
 FROM payments p
 INNER JOIN appointments a
 ON p.appointment_id=a.id
 WHERE a.patient_id=?) AS payments
`,
    [
      patientId,
      patientId,
      patientId,
      patientId,
      patientId,
      patientId,
      patientId,
    ],
  );

  return statistics;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getDoctorByUserId = async (userId) => {
  const [rows] = await pool.query(
    `
SELECT *
FROM doctors
WHERE user_id=?
`,
    [userId],
  );

  return rows[0];
};

const getPatientByUserId = async (userId) => {
  const [rows] = await pool.query(
    `
SELECT *
FROM patients
WHERE user_id=?
`,
    [userId],
  );

  return rows[0];
};

module.exports = {
  getAdminStatistics,
  getDoctorStatistics,
  getPatientStatistics,
  getDoctorByUserId,
  getPatientByUserId,
};
