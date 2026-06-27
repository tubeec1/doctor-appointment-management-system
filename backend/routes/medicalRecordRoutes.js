const express = require("express");

const router = express.Router();

const medicalRecordController = require("../controllers/medicalRecordController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createMedicalRecordValidator,
  updateMedicalRecordValidator,
} = require("../validators/medicalRecordValidator");

/* -------------------------------------------------------------------------- */
/* Create Medical Record                                                      */
/* -------------------------------------------------------------------------- */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Doctor"),
  createMedicalRecordValidator,
  medicalRecordController.createMedicalRecord,
);

/* -------------------------------------------------------------------------- */
/* Get My Medical Records (Patient)                                           */
/* -------------------------------------------------------------------------- */
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("Patient"),
  medicalRecordController.getMyMedicalRecords,
);

/* -------------------------------------------------------------------------- */
/* Get Doctor Medical Records                                                 */
/* -------------------------------------------------------------------------- */
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("Doctor"),
  medicalRecordController.getDoctorMedicalRecords,
);

/* -------------------------------------------------------------------------- */
/* Get All Medical Records (Admin)                                            */
/* -------------------------------------------------------------------------- */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("Administrator"),
  medicalRecordController.getAllMedicalRecords,
);

/* -------------------------------------------------------------------------- */
/* Get Medical Record Details                                                 */
/* -------------------------------------------------------------------------- */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator", "Doctor", "Patient"),
  medicalRecordController.getMedicalRecordById,
);

/* -------------------------------------------------------------------------- */
/* Update Medical Record                                                      */
/* -------------------------------------------------------------------------- */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Doctor"),
  updateMedicalRecordValidator,
  medicalRecordController.updateMedicalRecord,
);

/* -------------------------------------------------------------------------- */
/* Delete Medical Record                                                      */
/* -------------------------------------------------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  medicalRecordController.deleteMedicalRecord,
);

module.exports = router;
