const pool = require("../config/db");

const findDoctorByEmail = async (email) => {
  const [rows] = await pool.query(
    `     SELECT *
    FROM users
    WHERE email = ?
    `,
    [email],
  );

  return rows[0];
};

const createDoctorUser = async (data) => {
  const [result] = await pool.query(
    `     INSERT INTO users
    (
      role_id,
      full_name,
      email,
      password,
      gender,
      phone,
      address,
      nationality,
      profile_image
    )
    VALUES
    (?,?,?,?,?,?,?,?,?)
    `,
    [
      2,
      data.fullName,
      data.email,
      data.password,
      data.gender,
      data.phone,
      data.address,
      data.nationality,
      data.profileImage,
    ],
  );

  return result.insertId;
};

const createDoctor = async (data) => {
  const [result] = await pool.query(
    `     INSERT INTO doctors
    (
      user_id,
      specialization,
      experience_years,
      consultation_fee,
      bio
    )
    VALUES
    (?,?,?,?,?)
    `,
    [
      data.userId,
      data.specialization,
      data.experienceYears,
      data.consultationFee,
      data.bio,
    ],
  );

  return result.insertId;
};

const getAllDoctors = async () => {
  const [rows] = await pool.query(
    `
SELECT
u.id,
u.full_name,
u.email,
u.gender,
u.phone,
u.address,
u.nationality,
u.profile_image,
u.is_active,
u.created_at,

r.id AS role_id,
r.name AS role_name,

d.id AS doctor_id,
d.specialization,
d.experience_years,
d.consultation_fee,
d.bio

FROM doctors d
INNER JOIN users u
ON d.user_id = u.id

INNER JOIN roles r
ON r.id = u.role_id

WHERE u.is_active = 1

ORDER BY d.id DESC
`,
  );

  return rows;
};

const getDoctorById = async (doctorId) => {
  // Get doctor information
  const [doctorRows] = await pool.query(
    `
SELECT
u.id,
u.full_name,
u.email,
u.gender,
u.phone,
u.address,
u.nationality,
u.profile_image,
u.is_active,
u.last_login,
u.created_at,
u.updated_at,

r.id AS role_id,
r.name AS role_name,

d.id AS doctor_id,
d.specialization,
d.experience_years,
d.consultation_fee,
d.bio,

dep.id AS department_id,
dep.name AS department_name,
dep.description AS department_description

FROM doctors d

INNER JOIN users u
ON d.user_id = u.id

INNER JOIN roles r
ON r.id = u.role_id

LEFT JOIN doctor_departments dd
ON dd.doctor_id = d.id

LEFT JOIN departments dep
ON dep.id = dd.department_id

WHERE d.id = ?
AND u.is_active = 1
`,
    [doctorId],
  );

  if (doctorRows.length === 0) {
    return null;
  }

  const doctor = doctorRows[0];

  // Get all schedules for this doctor
  const [schedules] = await pool.query(
    `
SELECT
id,
doctor_id,
day_of_week,
start_time,
end_time,
created_at,
updated_at

FROM schedules

WHERE doctor_id = ?

ORDER BY
FIELD(
  day_of_week,
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
),
start_time ASC
`,
    [doctorId],
  );

  doctor.schedules = schedules;

  return doctor;
};

const updateDoctorUser = async (data) => {
  await pool.query(
    `     UPDATE users
    SET
      full_name=?,
      gender=?,
      phone=?,
      address=?,
      nationality=?,
      profile_image=?
    WHERE id=?
    `,
    [
      data.fullName,
      data.gender,
      data.phone,
      data.address,
      data.nationality,
      data.profileImage,
      data.userId,
    ],
  );
};

const updateDoctor = async (data) => {
  await pool.query(
    `     UPDATE doctors
    SET
      specialization=?,
      experience_years=?,
      consultation_fee=?,
      bio=?
    WHERE id=?
    `,
    [
      data.specialization,
      data.experienceYears,
      data.consultationFee,
      data.bio,
      data.doctorId,
    ],
  );
};

const deactivateDoctor = async (userId) => {
  await pool.query(
    `     UPDATE users
    SET is_active = 0
    WHERE id = ?
    `,
    [userId],
  );
};

module.exports = {
  findDoctorByEmail,
  createDoctorUser,
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorUser,
  updateDoctor,
  deactivateDoctor,
};
