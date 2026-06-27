const pool = require("../config/db");

/* -------------------------------------------------------------------------- */
/* Department CRUD                                                            */
/* -------------------------------------------------------------------------- */

const findDepartmentByName = async (name) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM departments
    WHERE name = ?
    `,
    [name],
  );

  return rows[0];
};

const createDepartment = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO departments
    (
      name,
      description
    )
    VALUES
    (?,?)
    `,
    [data.name, data.description || null],
  );

  return result.insertId;
};

const getDepartmentById = async (departmentId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM departments
    WHERE id = ?
    `,
    [departmentId],
  );

  return rows[0];
};

const getAllDepartments = async () => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM departments
    ORDER BY id DESC
    `,
  );

  return rows;
};

const updateDepartment = async (data) => {
  await pool.query(
    `
    UPDATE departments
    SET
      name = ?,
      description = ?
    WHERE id = ?
    `,
    [data.name, data.description, data.departmentId],
  );
};

const deleteDepartment = async (departmentId) => {
  await pool.query(
    `
    DELETE FROM departments
    WHERE id = ?
    `,
    [departmentId],
  );
};

/* -------------------------------------------------------------------------- */
/* Doctor Department                                                          */
/* -------------------------------------------------------------------------- */

const assignDoctorToDepartment = async (doctorId, departmentId) => {
  const [result] = await pool.query(
    `
    INSERT INTO doctor_departments
    (
      doctor_id,
      department_id
    )
    VALUES
    (?,?)
    `,
    [doctorId, departmentId],
  );

  return result.insertId;
};

const doctorDepartmentExists = async (doctorId, departmentId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM doctor_departments
    WHERE doctor_id = ?
    AND department_id = ?
    `,
    [doctorId, departmentId],
  );

  return rows[0];
};

const getDepartmentDoctors = async (departmentId) => {
  const [rows] = await pool.query(
    `
SELECT

dd.id,

d.id AS doctor_id,

u.full_name,
u.email,
u.phone,
u.gender,
u.profile_image,

d.specialization,
d.experience_years,
d.consultation_fee,

dep.id AS department_id,
dep.name AS department_name

FROM doctor_departments dd

INNER JOIN doctors d
ON dd.doctor_id = d.id

INNER JOIN users u
ON d.user_id = u.id

INNER JOIN departments dep
ON dd.department_id = dep.id

WHERE dep.id = ?

ORDER BY u.full_name ASC
`,
    [departmentId],
  );

  return rows;
};

const removeDoctorDepartment = async (id) => {
  await pool.query(
    `
    DELETE FROM doctor_departments
    WHERE id = ?
    `,
    [id],
  );
};

const getDoctorDepartmentById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM doctor_departments
    WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

module.exports = {
  findDepartmentByName,
  createDepartment,
  getDepartmentById,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,

  assignDoctorToDepartment,
  doctorDepartmentExists,
  getDepartmentDoctors,
  removeDoctorDepartment,
  getDoctorDepartmentById,
};
