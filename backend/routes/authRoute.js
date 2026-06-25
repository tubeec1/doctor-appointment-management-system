const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");
const uploadProfileImage = require("../middlewares/uploadProfileImage");

const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

router.post("/register", registerValidator, authController.register);

router.post("/login", loginValidator, authController.login);

router.get("/profile", authMiddleware, authController.profile);
router.put(
  "/update-profile",
  authMiddleware,
  uploadProfileImage.single("profileImage"),
  authController.updateProfile,
);

module.exports = router;
