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

const Profile = () => {
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

  // Syncing database structure with camelCase state hooks safely
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
    <div className="bg-slate-50/50 min-h-screen py-10 antialiased">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page Title Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Account Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your identity, core profile data, and clinical parameters.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Card Profile Summary */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div
              className="relative group cursor-pointer overflow-hidden rounded-full w-28 h-28 ring-4 ring-slate-100 transition-all hover:ring-slate-200/80"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={imagePreview || "https://placehold.co/150"}
                alt="Profile Avatar"
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition duration-200 text-white backdrop-blur-[2px]">
                <Camera size={20} className="stroke-[2.5]" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center sm:justify-start">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {formData.fullName || "User Account"}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider mx-auto sm:mx-0 w-max">
                  {user?.role_name || "Patient"}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1.5 flex items-center justify-center sm:justify-start gap-2">
                <Mail size={15} className="text-slate-400" />
                {formData.email || "No email registered"}
              </p>
            </div>
          </div>

          {/* Identity & Core Demographics Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
              <User size={18} className="text-blue-600 stroke-[2.5]" />
              <h3 className="text-base font-semibold text-slate-900">
                Identity & Core Demographics
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Phone Contact
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile phone number"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Gender Identity
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition appearance-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Nationality
                </label>
                <div className="relative">
                  <Globe
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Country of passport / origin"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Emergency Contact Connection
                </label>
                <div className="relative">
                  <ShieldAlert
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Name or phone of closest family member"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Biometrics & Clinical Parameters Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
              <HeartPulse size={18} className="text-blue-600 stroke-[2.5]" />
              <h3 className="text-base font-semibold text-slate-900">
                Biometrics & Clinical Parameters
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Blood Group
                </label>
                <div className="relative">
                  <Droplet
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition appearance-none"
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
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Weight (kg)
                </label>
                <div className="relative">
                  <Scale
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g. 72.5"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Height (cm)
                </label>
                <div className="relative">
                  <Ruler
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="e.g. 178"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Chronic Illnesses & Medical History Record
              </label>
              <textarea
                name="medicalHistory"
                rows={4}
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Elaborate details regarding historical surgeries, known allergies, or conditions..."
                className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none"
              />
            </div>
          </div>

          {/* Form Submit Footer Action */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow active:shadow-sm transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="animate-spin stroke-[2.5]"
                  />
                  <span>Updating Records...</span>
                </>
              ) : (
                <>
                  <Save size={16} className="stroke-[2.5]" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
