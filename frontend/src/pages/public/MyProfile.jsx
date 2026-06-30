import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Globe,
  Droplet,
  Scale,
  Ruler,
  ShieldAlert,
  HeartPulse,
  Calendar,
  Camera,
  LoaderCircle,
  Save,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  getProfile,
  updateProfile,
  clearError,
  clearMessage,
  selectUser,
  selectAuthLoading,
  selectAuthError,
  selectAuthMessage,
} from "../../features/auth/authSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // Redux Auth Selectors
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const message = useSelector(selectAuthMessage);

  // Form Controls State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    nationality: "",
    bloodGroup: "",
    weight: "",
    height: "",
    emergencyContact: "",
    medicalHistory: "",
    dateOfBirth: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Initial Data Fetch
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Syncing incoming snake_case database object structure with camelCase state hooks safely
  useEffect(() => {
    if (user) {
      let formattedDob = "";
      if (user.date_of_birth) {
        formattedDob = new Date(user.date_of_birth).toISOString().split("T")[0];
      }

      setFormData({
        fullName: user.full_name || "",
        email: user.email || "",
        gender: user.gender || "",
        phone: user.phone || "",
        nationality: user.nationality || "",
        bloodGroup: user.blood_group || "",
        weight: user.weight !== null ? user.weight : "",
        height: user.height !== null ? user.height : "",
        emergencyContact: user.emergency_contact || "",
        medicalHistory: user.medical_history || "",
        dateOfBirth: formattedDob,
      });

      if (user.profile_image) {
        setImagePreview(`http://localhost:5000/${user.profile_image}`);
      } else {
        setImagePreview("https://placehold.co/150");
      }
    }
  }, [user]);

  // Toast Messaging Listeners
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim())
      return toast.error("Full name cannot be empty.");
    if (!formData.phone.trim()) return toast.error("Phone number is required.");

    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("gender", formData.gender);
    formPayload.append("phone", formData.phone);
    formPayload.append("nationality", formData.nationality);
    formPayload.append("bloodGroup", formData.bloodGroup);
    formPayload.append("weight", formData.weight);
    formPayload.append("height", formData.height);
    formPayload.append("emergencyContact", formData.emergencyContact);
    formPayload.append("medicalHistory", formData.medicalHistory);
    formPayload.append("dateOfBirth", formData.dateOfBirth);

    if (selectedFile) {
      formPayload.append("profileImage", selectedFile);
    }

    dispatch(updateProfile(formPayload));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">Profile Settings</h1>
            <p className="mt-4 text-blue-100 text-lg max-w-xl mx-auto">
              Manage your personal identity details, active contact channels,
              and medical parameters.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Card Profile Summary */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={imagePreview || "https://placehold.co/150"}
                alt="Profile Avatar"
                className="w-32 h-32 rounded-2xl object-cover ring-4 ring-blue-50 border border-slate-200 transition group-hover:brightness-90"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition text-white">
                <Camera size={24} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="text-center md:text-left flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                <h2 className="text-3xl font-bold text-slate-900">
                  {formData.fullName || "User Account"}
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider mx-auto md:mx-0 w-max">
                  {user?.role_name || "Patient"}
                </span>
              </div>
              <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-gray-400" />{" "}
                {formData.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Form Matrix Containers */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-8">
            {/* Identity Group */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                <User size={18} className="text-blue-600" />
                Identity & Core Demographics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Phone Contact
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter mobile phone number"
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Gender Identity
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Nationality
                  </label>
                  <div className="relative">
                    <Globe
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="Country of passport / origin"
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Emergency Contact Connection
                  </label>
                  <div className="relative">
                    <ShieldAlert
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Name or phone of closest family member"
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Vital Analytics Group */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                <HeartPulse size={18} className="text-blue-600" />
                Biometrics & Clinical Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Blood Group
                  </label>
                  <div className="relative">
                    <Droplet
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    >
                      <option value="">Select Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <Scale
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="number"
                      step="0.1"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g. 72.5"
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <Ruler
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g. 178"
                      className="w-full border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Chronic Illnesses & Medical History Record
                </label>
                <textarea
                  name="medicalHistory"
                  rows={4}
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  placeholder="Elaborate details regarding historical surgeries, known allergies, or conditions..."
                  className="w-full border rounded-xl p-4 text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Form Submit Footer Action */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Updating Records...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Commit Profile Updates
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
