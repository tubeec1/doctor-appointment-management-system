import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  selectDoctors,
  selectDoctorLoading,
  selectDoctorError,
  selectDoctorMessage,
  clearDoctorError,
  clearDoctorMessage,
} from "../../features/doctors/doctorSlice"; // Adjust path to matching file node
import {
  UserPlus,
  Edit2,
  Trash2,
  Search,
  X,
  Upload,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Globe,
  Award,
  Calendar,
  DollarSign,
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

const Doctors = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(selectDoctors) || [];
  const loading = useSelector(selectDoctorLoading);
  const error = useSelector(selectDoctorError);
  const message = useSelector(selectDoctorMessage);

  // Search filter query parameter string state
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Context State Switches
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDoctorId, setEditDoctorId] = useState(null);

  // Local Form Controlled Object Initial State Matrix
  const initialFormState = {
    fullName: "",
    email: "",
    password: "",
    gender: "Male",
    phone: "",
    address: "",
    nationality: "",
    specialization: "",
    experienceYears: "",
    consultationFee: "",
    bio: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  // Sync Remote Core Fetch Arrays on Initial Mount
  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  // Clean Toast Message Streams automatically over time intervals
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearDoctorError()), 6000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => dispatch(clearDoctorMessage()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);

  // Launch Create Modal Flow Context
  const handleOpenCreateModal = () => {
    setEditDoctorId(null);
    setFormData(initialFormState);
    setProfileImage(null);
    setImagePreview("");
    setIsModalOpen(true);
  };

  // Launch Update Modal Flow Context matching data attributes
  const handleOpenEditModal = (doctor) => {
    setEditDoctorId(doctor.doctor_id);
    setFormData({
      fullName: doctor.fullName || doctor.full_name || "",
      gender: doctor.gender || "Male",
      phone: doctor.phone || "",
      address: doctor.address || "",
      nationality: doctor.nationality || "",
      specialization: doctor.specialization || "",
      experienceYears: doctor.experienceYears || doctor.experience_years || "",
      consultationFee: doctor.consultationFee || doctor.consultation_fee || "",
      bio: doctor.bio || "",
      email: "", // Excluded structurally from matching UI form inputs on edit channel
      password: "", // Excluded structurally from matching UI form inputs on edit channel
    });
    setProfileImage(null);
    setImagePreview(`http://localhost:5000/${doctor.profile_image}` || ``);
    setIsModalOpen(true);
  };

  // Dynamic state update text control vectors
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Extract Binary Blobs from Input Elements
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Execute Destructive Action Deletion Pipelines
  const handleDeleteClick = (id) => {
    if (
      window.confirm(
        "Are you absolutely sure you want to remove this practitioner from the directory registry?",
      )
    ) {
      dispatch(deleteDoctor(id));
    }
  };

  // Compile multipart data buffers for dispatch payloads
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataPayload = new FormData();

    // Iterate through tracking properties
    Object.keys(formData).forEach((key) => {
      // Omit sending auth credentials if executing inside update pipeline paths
      if (editDoctorId && (key === "email" || key === "password")) return;
      dataPayload.append(key, formData[key]);
    });

    if (profileImage) {
      dataPayload.append("profileImage", profileImage);
    }

    if (editDoctorId) {
      dispatch(
        updateDoctor({ doctorId: editDoctorId, formData: dataPayload }),
      ).then((res) => {
        if (!res.error) setIsModalOpen(false);
      });
    } else {
      dispatch(createDoctor(dataPayload)).then((res) => {
        if (!res.error) setIsModalOpen(false);
      });
    }
  };

  // Client-Side Search Stream Filtration Execution Mapping
  const filteredDoctors = doctors.filter((doc) => {
    const name = (doc.fullName || doc.full_name || "").toLowerCase();
    const spec = (doc.specialization || "").toLowerCase();
    const matchStr = searchQuery.toLowerCase();
    return name.includes(matchStr) || spec.includes(matchStr);
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800 space-y-8 relative">
      {/* GLOBAL SYSTEM FEEDBACK TOAST TOKENS */}
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none max-w-sm w-full">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl shadow-xl flex items-start gap-3 pointer-events-auto animate-slide-in">
            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={16} />
            <div className="text-xs font-bold">{error}</div>
          </div>
        )}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl shadow-xl flex items-start gap-3 pointer-events-auto animate-slide-in">
            <CheckCircle2
              className="text-emerald-600 shrink-0 mt-0.5"
              size={16}
            />
            <div className="text-xs font-bold">{message}</div>
          </div>
        )}
      </div>

      {/* ADMIN LEVEL CONSOLE HEADER PANEL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Medical Staffing Directory
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Provision access keys, alter clinical profiles, or decommission
            practitioner accounts.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 transition"
        >
          <UserPlus size={15} />
          Register New Practitioner
        </button>
      </div>

      {/* FILTER SEARCH UTILITIES COMPONENT BAR */}
      <div className="bg-white p-4 border border-slate-200/60 rounded-2xl shadow-sm flex items-center w-full max-w-md gap-3">
        <Search className="text-slate-400 shrink-0" size={18} />
        <input
          type="text"
          placeholder="Search by practitioner identity name or medical domain..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs font-medium text-slate-800 placeholder-slate-400 bg-transparent outline-none border-none"
        />
      </div>

      {/* LIVE REGISTRY LIST DOCK VIEWPORT */}
      {loading && doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] gap-3">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Syncing Directory Nodes...
          </p>
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col overflow-hidden group"
            >
              {/* Profile Card Header Segment */}
              <div className="p-6 flex items-start gap-4 border-b border-slate-100 relative">
                <div className="h-16 w-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-200/50 shrink-0 flex items-center justify-center">
                  {doctor.profileImage || doctor.profile_image ? (
                    <img
                      src={`http://localhost:5000/${doctor.profile_image}`}
                      alt="Doctor Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Stethoscope className="text-slate-400" size={24} />
                  )}
                </div>
                <div className="space-y-1 min-w-0 pr-16">
                  <h3 className="text-sm font-black text-slate-900 truncate">
                    Dr. {doctor.fullName || doctor.full_name}
                  </h3>
                  <span className="inline-block bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                    {doctor.specialization || "General Medicine"}
                  </span>
                  <p className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Award size={12} className="text-slate-400" />
                    {doctor.experienceYears ||
                      doctor.experience_years ||
                      0}{" "}
                    Years Experience
                  </p>
                </div>

                {/* Micro Floating Actions Group */}
                <div className="absolute top-6 right-6 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleOpenEditModal(doctor)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Profile"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(doctor.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Decommission Account"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Central Information Stack */}
              <div className="p-6 space-y-3 text-xs font-medium text-slate-600 flex-1 bg-slate-50/40">
                <div className="flex items-center gap-2.5">
                  <Mail size={13} className="text-slate-400 shrink-0" />
                  <span className="truncate text-slate-500">
                    {doctor.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={13} className="text-slate-400 shrink-0" />
                  <span>{doctor.phone || "No Registered Phone"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <DollarSign size={13} className="text-slate-400 shrink-0" />
                  <span className="font-bold text-slate-900">
                    $
                    {doctor.consultationFee ||
                      doctor.consultation_fee ||
                      "0.00"}{" "}
                    Consultation Fee
                  </span>
                </div>
                {doctor.bio && (
                  <p className="text-slate-400 italic font-normal line-clamp-2 pt-2 border-t border-slate-100">
                    "{doctor.bio}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <User size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-400">
            No medical practitioner records matched target parameters.
          </p>
        </div>
      )}

      {/* OVERLAY SYSTEM CONTEXT MODAL HUB */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col animate-fade-in">
            {/* Modal Header Title Bracket */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  {editDoctorId
                    ? "Modify Practitioner Parameters"
                    : "Register Clinical Account"}
                </h2>
                <p className="text-xs font-medium text-slate-400">
                  {editDoctorId
                    ? "Excludes structural identity authorization locks (Email & Passwords)."
                    : "Populate all data segments to write to core data streams."}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Programmatic Form Grid Matrix */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-6 space-y-6 flex-1 text-xs"
            >
              {/* BLOCK 1: BINARY MEDIA UPLOAD */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                <div className="h-16 w-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400 relative group shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <p className="font-bold text-slate-800">
                    Avatar Image Specification
                  </p>
                  <p className="text-slate-400 text-[11px] font-normal">
                    Supports JPEG, PNG file architectures up to 5MB.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-[11px] rounded-lg shadow-sm hover:bg-slate-50 transition"
                  >
                    <Upload size={12} />
                    Upload Profile Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* BLOCK 2: IDENTITIES GRID PANEL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" /> Full Legal
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr. Jane Doe"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">
                    Biological Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-bold text-slate-700 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* CONDITIONAL AUTH STREAM REDIRECTS (ONLY RENDER IF ON CREATE FLOW MATRIX) */}
                {!editDoctorId && (
                  <>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Mail size={13} className="text-slate-400" />{" "}
                        Administrative Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane.doe@clinic.com"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Lock size={13} className="text-slate-400" /> Access
                        Security Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone size={13} className="text-slate-400" /> Direct
                    Contact Line
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+252..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Globe size={13} className="text-slate-400" /> Nationality
                    Passport Origin
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleInputChange}
                    placeholder="Somali"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* BLOCK 3: CLINICAL PARAMETERS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Award size={13} className="text-slate-400" /> Medical
                    Domain Field
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    required
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Cardiology"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar size={13} className="text-slate-400" /> Experience
                    Metrics (Years)
                  </label>
                  <input
                    type="number"
                    name="experienceYears"
                    required
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    placeholder="5"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <DollarSign size={13} className="text-slate-400" />{" "}
                    Consultation Base Fee ($)
                  </label>
                  <input
                    type="number"
                    name="consultationFee"
                    required
                    value={formData.consultationFee}
                    onChange={handleInputChange}
                    placeholder="50"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* BLOCK 4: TEXT AREA MATRIX WRAPPERS */}
              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400" /> Primary
                    Residential Practice Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Hodna District, Mogadishu"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText size={13} className="text-slate-400" />{" "}
                    Practitioner Professional Biography Summary
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Briefly state clinic summary details, surgical milestones, or academic research profiles..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-medium text-slate-800 resize-none"
                  />
                </div>
              </div>

              {/* FORM EXECUTION TRIGGERS AND FOOTER CLOSURE */}
              <div className="flex justify-end items-center gap-3 border-t border-slate-100 pt-4 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 transition disabled:opacity-50 disabled:pointer-events-none min-w-[120px]"
                >
                  {loading && <Loader2 size={12} className="animate-spin" />}
                  {editDoctorId
                    ? "Save Parameter Changes"
                    : "Commit Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
