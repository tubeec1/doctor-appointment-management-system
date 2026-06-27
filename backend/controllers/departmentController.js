const { validationResult } = require("express-validator");

const departmentService = require("../services/departmentService");

/* -------------------------------------------------------------------------- */
/* Create Department                                                          */
/* -------------------------------------------------------------------------- */

const createDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const department = await departmentService.createDepartmentService(
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get All Departments                                                        */
/* -------------------------------------------------------------------------- */

const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartmentsService();

    return res.status(200).json({
      success: true,
      message: "Departments fetched successfully",
      departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Department By Id                                                       */
/* -------------------------------------------------------------------------- */

const getDepartmentById = async (req, res) => {
  try {
    const department = await departmentService.getDepartmentByIdService(
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Department details fetched successfully",
      department,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Update Department                                                          */
/* -------------------------------------------------------------------------- */

const updateDepartment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const department = await departmentService.updateDepartmentService(
      req.params.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Delete Department                                                          */
/* -------------------------------------------------------------------------- */

const deleteDepartment = async (req, res) => {
  try {
    await departmentService.deleteDepartmentService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Assign Doctor To Department                                                */
/* -------------------------------------------------------------------------- */

const assignDoctor = async (req, res) => {
  try {
    const { doctorId, departmentId } = req.body;

    const doctors = await departmentService.assignDoctorService(
      doctorId,
      departmentId,
    );

    return res.status(201).json({
      success: true,
      message: "Doctor assigned successfully",
      doctors,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Department Doctors                                                     */
/* -------------------------------------------------------------------------- */

const getDepartmentDoctors = async (req, res) => {
  try {
    const doctors = await departmentService.getDepartmentDoctorsService(
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Department doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Remove Doctor From Department                                              */
/* -------------------------------------------------------------------------- */

const removeDoctor = async (req, res) => {
  try {
    await departmentService.removeDoctorDepartmentService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Doctor removed from department successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,

  assignDoctor,
  getDepartmentDoctors,
  removeDoctor,
};
