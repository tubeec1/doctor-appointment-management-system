const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const uploadProfileImage = require("../middlewares/uploadProfileImage");

const {
  createDoctorValidator,
  updateDoctorValidator,
} = require("../validators/doctorValidator");

/* -------------------------------------------------------------------------- */
/* Create Doctor                                                              */
/* -------------------------------------------------------------------------- */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Administrator"),
  uploadProfileImage.single("profileImage"),
  createDoctorValidator,
  doctorController.createDoctor,
);

/* -------------------------------------------------------------------------- */
/* Get All Doctors                                                            */
/* -------------------------------------------------------------------------- */
router.get("/", authMiddleware, doctorController.getAllDoctors);

/* -------------------------------------------------------------------------- */
/* Get Doctor By Id                                                           */
/* -------------------------------------------------------------------------- */
router.get("/:id", authMiddleware, doctorController.getDoctorById);

/* -------------------------------------------------------------------------- */
/* Update Doctor                                                              */
/* -------------------------------------------------------------------------- */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  uploadProfileImage.single("profileImage"),
  updateDoctorValidator,
  doctorController.updateDoctor,
);

/* -------------------------------------------------------------------------- */
/* Delete Doctor                                                              */
/* -------------------------------------------------------------------------- */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  doctorController.deleteDoctor,
);

module.exports = router;
