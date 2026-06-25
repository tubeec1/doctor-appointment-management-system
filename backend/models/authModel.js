const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email],
  );

  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

const findUserFullDetailsByEmail = async (email) => {
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

      p.date_of_birth,
      p.blood_group,
      p.weight,
      p.height,
      p.emergency_contact,
      p.medical_history,

      d.id AS doctor_id,
      d.specialization,
      d.experience_years,
      d.consultation_fee,
      d.bio

    FROM users u

    INNER JOIN roles r
      ON r.id = u.role_id

    LEFT JOIN patients p
      ON p.user_id = u.id

    LEFT JOIN doctors d
      ON d.user_id = u.id

    WHERE u.email = ?
    `,
    [email],
  );

  return rows[0];
};

const createUser = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO users
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
      data.roleId,
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

const createPatient = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO patients
    (
      user_id,
      date_of_birth,
      blood_group
    )
    VALUES
    (?,?,?)
    `,
    [data.userId, data.dateOfBirth, data.bloodGroup],
  );

  return result.insertId;
};

const updateUser = async (data) => {
  await pool.query(
    `
    UPDATE users
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

const updatePatient = async (data) => {
  await pool.query(
    `
    UPDATE patients
    SET
    date_of_birth=?,
    blood_group=?,
    weight=?,
    height=?,
    emergency_contact=?,
    medical_history=?
    WHERE user_id=?
    `,
    [
      data.dateOfBirth,
      data.bloodGroup,
      data.weight,
      data.height,
      data.emergencyContact,
      data.medicalHistory,
      data.userId,
    ],
  );
};

const updateLastLogin = async (userId) => {
  await pool.query(
    `
      UPDATE users
      SET last_login = NOW()
      WHERE id = ?
    `,
    [userId],
  );
};
module.exports = {
  findUserByEmail,
  createUser,
  createPatient,
  findUserById,
  updateUser,
  updatePatient,
  findUserFullDetailsByEmail,
  updateLastLogin,
};
