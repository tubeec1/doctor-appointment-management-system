const bcrypt = require("bcryptjs");

const authModel = require("../models/authModel");

const generateToken = require("../helpers/generateToken");

const registerService = async (data) => {
  const existingUser = await authModel.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const profileImage =
    data.gender === "Male"
      ? "uploads/profileImages/default/male.png"
      : "uploads/profileImages/default/female.png";

  const userId = await authModel.createUser({
    roleId: 3,
    fullName: data.fullName,
    email: data.email,
    password: hashedPassword,
    gender: data.gender,
    phone: data.phone || null,
    address: data.address || null,
    nationality: data.nationality || null,
    profileImage,
  });

  await authModel.createPatient({
    userId,
    dateOfBirth: data.dateOfBirth || null,
    bloodGroup: data.bloodGroup || null,
  });

  return {
    success: true,
    message: "Registration successful",
  };
};

const loginService = async (email, password) => {
  const userAuth = await authModel.findUserByEmail(email);

  if (!userAuth) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, userAuth.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  await authModel.updateLastLogin(userAuth.id);

  const user = await authModel.findUserFullDetailsByEmail(email);

  const token = generateToken({
    id: user.id,
    roleId: user.role_id,
    email: user.email,
  });

  return {
    token,
    user: user,
  };
};
const updateProfileService = async (userId, body, file) => {
  const user = await authModel.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  let profileImage = user.profile_image;

  if (file) {
    profileImage = `uploads/profileImages/${file.filename}`;
  }

  await authModel.updateUser({
    userId,

    fullName: body.fullName || user.full_name,

    gender: body.gender || user.gender,

    phone: body.phone || user.phone,

    address: body.address || user.address,

    nationality: body.nationality || user.nationality,

    profileImage,
  });

  await authModel.updatePatient({
    userId,

    dateOfBirth: body.dateOfBirth || null,

    bloodGroup: body.bloodGroup || null,

    weight: body.weight || null,

    height: body.height || null,

    emergencyContact: body.emergencyContact || null,

    medicalHistory: body.medicalHistory || null,
  });

  return {
    success: true,
    message: "Profile updated successfully",
  };
};

let findUserByEmail = async (email) => {
  return await authModel.findUserFullDetailsByEmail(email);
};

module.exports = {
  registerService,
  loginService,
  updateProfileService,
  findUserByEmail,
};
