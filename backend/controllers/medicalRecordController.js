const medicalRecordService = require("../services/medicalRecordService");

/* -------------------------------------------------------------------------- */
/* Create Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const createMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await medicalRecordService.createMedicalRecordService(
      req.user.id,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Medical record created successfully",
      medicalRecord,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get All Medical Records                                                    */
/* -------------------------------------------------------------------------- */

const getAllMedicalRecords = async (req, res) => {
  try {
    const medicalRecords =
      await medicalRecordService.getAllMedicalRecordsService();

    res.json({
      success: true,
      message: "Medical records fetched successfully",
      medicalRecords,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Medical Record By ID                                                   */
/* -------------------------------------------------------------------------- */

const getMedicalRecordById = async (req, res) => {
  try {
    const medicalRecord =
      await medicalRecordService.getMedicalRecordByIdService(req.params.id);

    res.json({
      success: true,
      message: "Medical record details fetched successfully",
      medicalRecord,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get My Medical Records                                                     */
/* -------------------------------------------------------------------------- */

const getMyMedicalRecords = async (req, res) => {
  try {
    const medicalRecords =
      await medicalRecordService.getPatientMedicalRecordsService(req.user.id);

    res.json({
      success: true,
      message: "My medical records fetched successfully",
      medicalRecords,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Doctor Medical Records                                                 */
/* -------------------------------------------------------------------------- */

const getDoctorMedicalRecords = async (req, res) => {
  try {
    const medicalRecords =
      await medicalRecordService.getDoctorMedicalRecordsService(req.user.id);

    res.json({
      success: true,
      message: "Doctor medical records fetched successfully",
      medicalRecords,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Update Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const updateMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await medicalRecordService.updateMedicalRecordService(
      req.user.id,
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      message: "Medical record updated successfully",
      medicalRecord,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Delete Medical Record                                                      */
/* -------------------------------------------------------------------------- */

const deleteMedicalRecord = async (req, res) => {
  try {
    await medicalRecordService.deleteMedicalRecordService(req.params.id);

    res.json({
      success: true,
      message: "Medical record deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  getMyMedicalRecords,
  getDoctorMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord,
};
