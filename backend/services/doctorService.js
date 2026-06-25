const bcrypt = require("bcryptjs");

const doctorModel = require("../models/doctorModel");

const createDoctorService = async (data, file) => {
  const existingDoctor = await doctorModel.findDoctorByEmail(data.email);

  if (existingDoctor) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  let profileImage =
    data.gender === "Male"
      ? "uploads/profileImages/default/male.png"
      : "uploads/profileImages/default/female.png";

  if (file) {
    profileImage = `uploads/profileImages/${file.filename}`;
  }

  const userId = await doctorModel.createDoctorUser({
    fullName: data.fullName,
    email: data.email,
    password: hashedPassword,
    gender: data.gender,
    phone: data.phone || null,
    address: data.address || null,
    nationality: data.nationality || null,
    profileImage,
  });

  const doctorId = await doctorModel.createDoctor({
    userId,
    specialization: data.specialization,
    experienceYears: data.experienceYears || 0,
    consultationFee: data.consultationFee || 0,
    bio: data.bio || null,
  });

  const doctor = await doctorModel.getDoctorById(doctorId);

  return doctor;
};

const getAllDoctorsService = async () => {
  return await doctorModel.getAllDoctors();
};

const getDoctorByIdService = async (doctorId) => {
  const doctor = await doctorModel.getDoctorById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor;
};

const updateDoctorService = async (doctorId, body, file) => {
  const doctor = await doctorModel.getDoctorById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  let profileImage = doctor.profile_image;

  if (file) {
    profileImage = `uploads/profileImages/${file.filename}`;
  }

  await doctorModel.updateDoctorUser({
    userId: doctor.id,

    fullName: body.fullName || doctor.full_name,

    gender: body.gender || doctor.gender,

    phone: body.phone || doctor.phone,

    address: body.address || doctor.address,

    nationality: body.nationality || doctor.nationality,

    profileImage,
  });

  await doctorModel.updateDoctor({
    doctorId,

    specialization: body.specialization || doctor.specialization,

    experienceYears: body.experienceYears || doctor.experience_years,

    consultationFee: body.consultationFee || doctor.consultation_fee,

    bio: body.bio || doctor.bio,
  });

  const updatedDoctor = await doctorModel.getDoctorById(doctorId);

  return updatedDoctor;
};

const deleteDoctorService = async (doctorId) => {
  const doctor = await doctorModel.getDoctorById(doctorId);

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  await doctorModel.deactivateDoctor(doctor.id);

  return true;
};

module.exports = {
  createDoctorService,
  getAllDoctorsService,
  getDoctorByIdService,
  updateDoctorService,
  deleteDoctorService,
};
