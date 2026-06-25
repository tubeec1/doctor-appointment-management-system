const express = require("express");

const router = express.Router();

const scheduleController = require("../controllers/scheduleController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createScheduleValidator,
  updateScheduleValidator,
} = require("../validators/scheduleValidator");

/* -------------------------------------------------------------------------- */
/* Create Schedule                                                            */
/* Admin Only                                                                 */
/* -------------------------------------------------------------------------- */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Administrator"),
  createScheduleValidator,
  scheduleController.createSchedule,
);

/* -------------------------------------------------------------------------- */
/* Get All Schedules                                                          */
/* -------------------------------------------------------------------------- */

router.get("/", authMiddleware, scheduleController.getAllSchedules);

/* -------------------------------------------------------------------------- */
/* Get Schedule By ID                                                         */
/* -------------------------------------------------------------------------- */

router.get("/:id", authMiddleware, scheduleController.getScheduleById);

/* -------------------------------------------------------------------------- */
/* Get Doctor Schedules                                                       */
/* -------------------------------------------------------------------------- */

router.get(
  "/doctor/:doctorId",
  authMiddleware,
  scheduleController.getSchedulesByDoctorId,
);

/* -------------------------------------------------------------------------- */
/* Update Schedule                                                            */
/* Admin Only                                                                 */
/* -------------------------------------------------------------------------- */

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  updateScheduleValidator,
  scheduleController.updateSchedule,
);

/* -------------------------------------------------------------------------- */
/* Delete Schedule                                                            */
/* Admin Only                                                                 */
/* -------------------------------------------------------------------------- */

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  scheduleController.deleteSchedule,
);

module.exports = router;
