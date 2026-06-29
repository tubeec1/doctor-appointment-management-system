const express = require("express");

const router = express.Router();

const departmentController = require("../controllers/departmentController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createDepartmentValidator,
  updateDepartmentValidator,
  assignDoctorValidator,
} = require("../validators/departmentValidator");

/* -------------------------------------------------------------------------- */
/* Department CRUD                                                            */
/* -------------------------------------------------------------------------- */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Administrator"),
  createDepartmentValidator,
  departmentController.createDepartment,
);

router.get(
  "/",

  departmentController.getAllDepartments,
);

router.get(
  "/:id",

  departmentController.getDepartmentById,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  updateDepartmentValidator,
  departmentController.updateDepartment,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  departmentController.deleteDepartment,
);

/* -------------------------------------------------------------------------- */
/* Doctor Department                                                          */
/* -------------------------------------------------------------------------- */

router.post(
  "/assign-doctor",
  authMiddleware,
  roleMiddleware("Administrator"),
  assignDoctorValidator,
  departmentController.assignDoctor,
);

router.get(
  "/:id/doctors",

  departmentController.getDepartmentDoctors,
);

router.delete(
  "/remove-doctor/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  departmentController.removeDoctor,
);

module.exports = router;
