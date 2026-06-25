const { validationResult } = require("express-validator");

const doctorService = require("../services/doctorService");

const createDoctor = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const doctor = await doctorService.createDoctorService(req.body, req.file);

    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAllDoctorsService();

    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Doctor details fetched successfully",
      doctor,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const doctor = await doctorService.updateDoctorService(
      req.params.id,
      req.body,
      req.file,
    );

    return res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await doctorService.deleteDoctorService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
