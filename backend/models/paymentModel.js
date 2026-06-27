const pool = require("../config/db");

/* -------------------------------------------------------------------------- */
/* Create Payment                                                             */
/* -------------------------------------------------------------------------- */

const createPayment = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO payments
    (
      appointment_id,
      amount,
      receipt_image,
      payment_method,
      payment_status,
      verified_by,
      payment_date
    )
    VALUES
    (?,?,?,?,?,?,NOW())
    `,
    [
      data.appointmentId,
      data.amount,
      data.receiptImage,
      data.paymentMethod,
      "Pending",
      null,
    ],
  );

  return result.insertId;
};

/* -------------------------------------------------------------------------- */
/* Get Payment By ID                                                          */
/* -------------------------------------------------------------------------- */

const getPaymentById = async (paymentId) => {
  const [rows] = await pool.query(
    `
SELECT

p.id,
p.amount,
p.receipt_image,
p.payment_method,
p.payment_status,
p.payment_date,
p.created_at,
p.updated_at,

a.id AS appointment_id,
a.appointment_date,
a.status AS appointment_status,

pat.id AS patient_id,
pu.full_name AS patient_name,
pu.email AS patient_email,
pu.phone AS patient_phone,

doc.id AS doctor_id,
du.full_name AS doctor_name,
doc.specialization,

v.full_name AS verified_by_name

FROM payments p

INNER JOIN appointments a
ON p.appointment_id = a.id

INNER JOIN patients pat
ON a.patient_id = pat.id

INNER JOIN users pu
ON pat.user_id = pu.id

INNER JOIN doctors doc
ON a.doctor_id = doc.id

INNER JOIN users du
ON doc.user_id = du.id

LEFT JOIN users v
ON p.verified_by = v.id

WHERE p.id = ?
`,
    [paymentId],
  );

  return rows[0];
};

/* -------------------------------------------------------------------------- */
/* Get All Payments                                                           */
/* -------------------------------------------------------------------------- */

const getAllPayments = async () => {
  const [rows] = await pool.query(
    `
SELECT

p.id,
p.amount,
p.payment_method,
p.payment_status,
p.payment_date,

a.id AS appointment_id,
a.appointment_date,

pu.full_name AS patient_name,

doc.id AS doctor_id,
du.full_name AS doctor_name,

doc.specialization

FROM payments p

INNER JOIN appointments a
ON p.appointment_id = a.id

INNER JOIN patients pat
ON a.patient_id = pat.id

INNER JOIN users pu
ON pat.user_id = pu.id

INNER JOIN doctors doc
ON a.doctor_id = doc.id

INNER JOIN users du
ON doc.user_id = du.id

ORDER BY p.id DESC
`,
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Get Payments By Patient                                                    */
/* -------------------------------------------------------------------------- */

const getPaymentsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
SELECT

p.id,
p.amount,
p.receipt_image,
p.payment_method,
p.payment_status,
p.payment_date,

a.id AS appointment_id,
a.appointment_date,

doc.id AS doctor_id,
du.full_name AS doctor_name,
doc.specialization

FROM payments p

INNER JOIN appointments a
ON p.appointment_id = a.id

INNER JOIN doctors doc
ON a.doctor_id = doc.id

INNER JOIN users du
ON doc.user_id = du.id

WHERE a.patient_id = ?

ORDER BY p.id DESC
`,
    [patientId],
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Update Payment                                                             */
/* -------------------------------------------------------------------------- */

const updatePayment = async (paymentId, data) => {
  await pool.query(
    `
UPDATE payments
SET
amount = ?,
payment_method = ?,
payment_status = ?,
verified_by = ?
WHERE id = ?
`,
    [
      data.amount,
      data.paymentMethod,
      data.paymentStatus,
      data.verifiedBy,
      paymentId,
    ],
  );
};

/* -------------------------------------------------------------------------- */
/* Delete Payment                                                             */
/* -------------------------------------------------------------------------- */

const deletePayment = async (paymentId) => {
  await pool.query(
    `
DELETE FROM payments
WHERE id = ?
`,
    [paymentId],
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

const getPaymentByAppointmentId = async (appointmentId) => {
  const [rows] = await pool.query(
    `
SELECT *
FROM payments
WHERE appointment_id = ?
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

module.exports = {
  createPayment,
  getPaymentById,
  getAllPayments,
  getPaymentsByPatientId,
  updatePayment,
  deletePayment,
  getAppointmentById,
  getPaymentByAppointmentId,
  getPatientByUserId,
};
