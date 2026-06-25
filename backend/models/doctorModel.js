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
u.last_login,
u.created_at,
u.updated_at,

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

WHERE d.id = ?
AND u.is_active = 1
`,
    [doctorId],
  );

  return rows[0];
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
