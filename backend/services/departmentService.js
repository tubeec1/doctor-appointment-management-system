const departmentModel = require("../models/departmentModel");

/* -------------------------------------------------------------------------- */
/* Create Department                                                          */
/* -------------------------------------------------------------------------- */

const createDepartmentService = async (body) => {
  const existingDepartment = await departmentModel.findDepartmentByName(
    body.name,
  );

  if (existingDepartment) {
    throw new Error("Department already exists");
  }

  const departmentId = await departmentModel.createDepartment({
    name: body.name,
    description: body.description,
  });

  const department = await departmentModel.getDepartmentById(departmentId);

  return department;
};

/* -------------------------------------------------------------------------- */
/* Get All Departments                                                        */
/* -------------------------------------------------------------------------- */

const getAllDepartmentsService = async () => {
  return await departmentModel.getAllDepartments();
};

/* -------------------------------------------------------------------------- */
/* Get Department By Id                                                       */
/* -------------------------------------------------------------------------- */

const getDepartmentByIdService = async (departmentId) => {
  const department = await departmentModel.getDepartmentById(departmentId);

  if (!department) {
    throw new Error("Department not found");
  }

  return department;
};

/* -------------------------------------------------------------------------- */
/* Update Department                                                          */
/* -------------------------------------------------------------------------- */

const updateDepartmentService = async (departmentId, body) => {
  const department = await departmentModel.getDepartmentById(departmentId);

  if (!department) {
    throw new Error("Department not found");
  }

  if (body.name && body.name !== department.name) {
    const existingDepartment = await departmentModel.findDepartmentByName(
      body.name,
    );

    if (existingDepartment) {
      throw new Error("Department name already exists");
    }
  }

  await departmentModel.updateDepartment({
    departmentId,

    name: body.name || department.name,

    description: body.description ?? department.description,
  });

  return await departmentModel.getDepartmentById(departmentId);
};

/* -------------------------------------------------------------------------- */
/* Delete Department                                                          */
/* -------------------------------------------------------------------------- */

const deleteDepartmentService = async (departmentId) => {
  const department = await departmentModel.getDepartmentById(departmentId);

  if (!department) {
    throw new Error("Department not found");
  }

  await departmentModel.deleteDepartment(departmentId);
};

/* -------------------------------------------------------------------------- */
/* Assign Doctor To Department                                                */
/* -------------------------------------------------------------------------- */

const assignDoctorService = async (doctorId, departmentId) => {
  const department = await departmentModel.getDepartmentById(departmentId);

  if (!department) {
    throw new Error("Department not found");
  }

  const exists = await departmentModel.doctorDepartmentExists(
    doctorId,
    departmentId,
  );

  if (exists) {
    throw new Error("Doctor already assigned to this department");
  }

  await departmentModel.assignDoctorToDepartment(doctorId, departmentId);

  return await departmentModel.getDepartmentDoctors(departmentId);
};

/* -------------------------------------------------------------------------- */
/* Get Department Doctors                                                     */
/* -------------------------------------------------------------------------- */

const getDepartmentDoctorsService = async (departmentId) => {
  const department = await departmentModel.getDepartmentById(departmentId);

  if (!department) {
    throw new Error("Department not found");
  }

  return await departmentModel.getDepartmentDoctors(departmentId);
};

/* -------------------------------------------------------------------------- */
/* Remove Doctor From Department                                              */
/* -------------------------------------------------------------------------- */

const removeDoctorDepartmentService = async (id) => {
  const doctorDepartment = await departmentModel.getDoctorDepartmentById(id);

  if (!doctorDepartment) {
    throw new Error("Assignment not found");
  }

  await departmentModel.removeDoctorDepartment(id);
};

module.exports = {
  createDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,

  assignDoctorService,
  getDepartmentDoctorsService,
  removeDoctorDepartmentService,
};
