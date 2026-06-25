const pool = require("../config/db");

/* -------------------------------------------------------------------------- */
/* Create Schedule                                                            */
/* -------------------------------------------------------------------------- */

const createSchedule = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO schedules
    (
      doctor_id,
      day_of_week,
      start_time,
      end_time
    )
    VALUES
    (?,?,?,?)
    `,
    [data.doctorId, data.dayOfWeek, data.startTime, data.endTime],
  );

  return result.insertId;
};

/* -------------------------------------------------------------------------- */
/* Get Schedule By ID                                                         */
/* -------------------------------------------------------------------------- */

const getScheduleById = async (id) => {
  const [rows] = await pool.query(
    `
SELECT

s.*,

d.id AS doctor_id,

u.full_name AS doctor_name,
u.email,
u.phone,

doc.specialization

FROM schedules s

INNER JOIN doctors d
ON s.doctor_id = d.id

INNER JOIN users u
ON d.user_id = u.id

INNER JOIN doctors doc
ON doc.id = d.id

WHERE s.id = ?
`,
    [id],
  );

  return rows[0];
};

/* -------------------------------------------------------------------------- */
/* Get All Schedules                                                          */
/* -------------------------------------------------------------------------- */

const getAllSchedules = async () => {
  const [rows] = await pool.query(
    `
SELECT

s.*,

u.full_name AS doctor_name,

doc.specialization

FROM schedules s

INNER JOIN doctors d
ON s.doctor_id = d.id

INNER JOIN users u
ON d.user_id = u.id

INNER JOIN doctors doc
ON doc.id = d.id

ORDER BY s.id DESC
`,
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Schedules                                                       */
/* -------------------------------------------------------------------------- */

const getSchedulesByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
SELECT *
FROM schedules
WHERE doctor_id = ?
ORDER BY id DESC
`,
    [doctorId],
  );

  return rows;
};

/* -------------------------------------------------------------------------- */
/* Update Schedule                                                            */
/* -------------------------------------------------------------------------- */

const updateSchedule = async (id, data) => {
  await pool.query(
    `
    UPDATE schedules
    SET
      day_of_week=?,
      start_time=?,
      end_time=?
    WHERE id=?
    `,
    [data.dayOfWeek, data.startTime, data.endTime, id],
  );
};

/* -------------------------------------------------------------------------- */
/* Delete Schedule                                                            */
/* -------------------------------------------------------------------------- */

const deleteSchedule = async (id) => {
  await pool.query(
    `
    DELETE FROM schedules
    WHERE id = ?
    `,
    [id],
  );
};

module.exports = {
  createSchedule,
  getScheduleById,
  getAllSchedules,
  getSchedulesByDoctorId,
  updateSchedule,
  deleteSchedule,
};
