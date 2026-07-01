import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  RefreshCw,
  LoaderCircle,
  AlertCircle,
  User,
  Activity,
  Pill,
  Calendar,
  Edit3,
  X,
  FileCheck,
  ClipboardList,
  Clock,
  BriefcaseMedical,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Medical Record Slice Features
import {
  getDoctorMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  clearMedicalRecordError,
  clearMedicalRecordMessage,
  selectDoctorMedicalRecords,
  selectMedicalRecordLoading,
  selectMedicalRecordError,
  selectMedicalRecordMessage,
} from "../../features/medicalRecords/medicalRecordSlice";

// Appointment Slice Integration
import {
  getDoctorAppointments,
  selectDoctorAppointments,
  clearAppointmentError,
  selectAppointmentLoading,
} from "../../features/appointments/appointmentSlice";

const MedicalRecords = () => {
  const dispatch = useDispatch();

  // Redux States: Medical Records
  const records = useSelector(selectDoctorMedicalRecords);
  const recordLoading = useSelector(selectMedicalRecordLoading);
  const recordError = useSelector(selectMedicalRecordError);
  const recordMessage = useSelector(selectMedicalRecordMessage);

  // Redux States: Appointments
  const doctorAppointments = useSelector(selectDoctorAppointments);
  const appointmentLoading = useSelector(selectAppointmentLoading);

  // Search & Filter UI State
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Side-Drawer Operations Setup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' | 'edit'
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  // Form Field State Structure
  const [formData, setFormData] = useState({
    appointmentId: "",
    diagnosis: "",
    prescription: "",
    doctorNotes: "",
  });

  // Fetch initial data layers on component mount
  useEffect(() => {
    dispatch(getDoctorMedicalRecords());
    dispatch(getDoctorAppointments());
  }, [dispatch]);

  // Toast notifications error/success synchronization
  useEffect(() => {
    if (recordError) {
      toast.error(recordError);
      dispatch(clearMedicalRecordError());
    }
  }, [recordError, dispatch]);

  useEffect(() => {
    if (recordMessage) {
      toast.success(recordMessage);
      dispatch(clearMedicalRecordMessage());
      closeModal();
      // Re-fetch records list to capture backend updates instantly
      dispatch(getDoctorMedicalRecords());
    }
  }, [recordMessage, dispatch]);

  // Reset inputs & terminate modal focus view
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecordId(null);
    setFormData({
      appointmentId: "",
      diagnosis: "",
      prescription: "",
      doctorNotes: "",
    });
  };

  const handleOpenCreate = () => {
    setModalMode("create");
    // Default select to the first available appointment option if present
    const validAppts =
      doctorAppointments?.filter((a) => a.status !== "cancelled") || [];
    setFormData({
      appointmentId: validAppts.length > 0 ? validAppts[0].id : "",
      diagnosis: "",
      prescription: "",
      doctorNotes: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setModalMode("edit");
    setSelectedRecordId(record.id);
    setFormData({
      appointmentId: record.appointment_id || record.appointmentId || "",
      diagnosis: record.diagnosis || "",
      prescription: record.prescription || "",
      doctorNotes: record.doctorNotes || record.doctor_notes || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "create") {
      if (!formData.appointmentId) {
        return toast.error(
          "Please select an active Appointment reference mapping.",
        );
      }
      dispatch(
        createMedicalRecord({
          appointmentId: Number(formData.appointmentId),
          diagnosis: formData.diagnosis,
          prescription: formData.prescription,
          doctorNotes: formData.doctorNotes,
        }),
      );
    } else {
      dispatch(
        updateMedicalRecord({
          recordId: selectedRecordId,
          recordData: {
            diagnosis: formData.diagnosis,
            prescription: formData.prescription,
            doctorNotes: formData.doctorNotes,
          },
        }),
      );
    }
  };

  const recordsList = records || [];

  // Filter Pipeline matching against Patient Name, Record IDs, or Diagnosis terms
  const filteredRecords = recordsList.filter((rec) => {
    const patientName = rec.patient_name || rec.appointment?.patient_name || "";
    const diagnosis = rec.diagnosis || "";
    const matchesSearch =
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.id?.toString().includes(searchQuery) ||
      rec.appointmentId?.toString().includes(searchQuery);

    return matchesSearch;
  });

  // Filter out cancelled items to keep appointment listings accurate
  const activeAppointments =
    doctorAppointments?.filter((appt) => appt.status !== "cancelled") || [];

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Block Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 flex items-center gap-2">
              <ClipboardList className="text-blue-600" size={26} />
              Clinical Medical Records
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Document clinical history, register diagnostic findings, and track
              client therapeutic prescription charts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                dispatch(getDoctorMedicalRecords());
                dispatch(getDoctorAppointments());
              }}
              disabled={recordLoading || appointmentLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-60 transition"
            >
              <RefreshCw
                size={14}
                className={
                  recordLoading || appointmentLoading ? "animate-spin" : ""
                }
              />
              <span>Sync Dashboard</span>
            </button>
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 transition"
            >
              <Plus size={15} />
              <span>New Entry</span>
            </button>
          </div>
        </div>

        {/* Search Layout Action bar */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm mb-6 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records by patient name, ID, or diagnosis tags..."
              className="w-full bg-slate-50/60 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
            />
          </div>
          <div className="text-xs font-medium text-slate-400">
            Showing {filteredRecords.length} of {recordsList.length} total
            entries
          </div>
        </div>

        {/* Content Render Blocks */}
        {recordLoading && recordsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-slate-200/80 rounded-xl">
            <LoaderCircle
              size={36}
              className="animate-spin text-blue-600 stroke-[2.5]"
            />
            <p className="text-xs text-slate-500 mt-3 font-medium">
              Extracting health repository records...
            </p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200/80 rounded-xl px-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <AlertCircle size={20} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              No medical records mapped
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Could not locate files matching your parameters. Register a new
              entry slot above to update system data arrays.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredRecords.map((record) => {
              const formattedDate =
                record.created_at || record.createdAt
                  ? new Date(
                      record.created_at || record.createdAt,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Date N/A";

              return (
                <div
                  key={record.id}
                  className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  <div className="space-y-4 flex-1">
                    {/* Upper Metadata Ribbon */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <User size={14} />
                        </div>
                        <span>
                          {record.patient_name ||
                            record.appointment?.patient_name ||
                            "Unknown Patient"}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                        Record ID: #{record.id}
                      </span>
                      <span className="text-[11px] font-mono bg-blue-50 px-2 py-0.5 rounded text-blue-600">
                        Appt Ref: #
                        {record.appointment_id || record.appointmentId}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-auto md:order-last">
                        <Calendar size={13} />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Diagnosis & Prescriptions Grid row layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Diagnosis Section */}
                      <div className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-200/60">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                          <Activity size={13} className="text-amber-500" />
                          Diagnostic Assessment
                        </h5>
                        <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">
                          {record.diagnosis ||
                            "No diagnosis details specified."}
                        </p>
                      </div>

                      {/* Prescription Section */}
                      <div className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-200/60">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                          <Pill size={13} className="text-emerald-500" />
                          Therapeutic Prescriptions
                        </h5>
                        <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap leading-relaxed font-mono bg-white p-2 rounded border border-slate-100">
                          {record.prescription ||
                            "No medicine maps configured."}
                        </p>
                      </div>
                    </div>

                    {/* Optional Internal Doctor Progress Notes */}
                    {(record.doctorNotes || record.doctor_notes) && (
                      <div className="text-xs border-l-2 border-blue-200 bg-blue-50/30 px-3 py-2 rounded-r-lg">
                        <span className="block font-semibold text-slate-400 uppercase tracking-wide text-[10px] mb-0.5">
                          Internal Clinical Notes
                        </span>
                        <p className="text-slate-600 italic leading-relaxed">
                          "{record.doctorNotes || record.doctor_notes}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Column panel */}
                  <div className="flex md:flex-col items-center justify-end flex-shrink-0 pt-2 md:pt-0 border-t border-slate-100 md:border-t-0">
                    <button
                      onClick={() => handleOpenEdit(record)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 rounded-lg transition text-xs flex items-center gap-1.5 font-medium shadow-sm bg-white"
                    >
                      <Edit3 size={14} />
                      <span>Amend File</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Slid-out Panel Context overlay drawer */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in">
            {/* Backdrop Layer */}
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
              onClick={closeModal}
            />

            {/* Panel Container Layout */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 transition-transform transform duration-300 ease-out">
              {/* Drawer Layout Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck className="text-blue-600" size={18} />
                    {modalMode === "create"
                      ? "Compile Medical Record"
                      : "Amend Medical Document"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {modalMode === "create"
                      ? "Create health analysis and therapy guidelines."
                      : "Modify case diagnostic data parameters safely."}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Entry Area */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-6 space-y-5"
              >
                {/* Appointment Select Field (Conditional Selection Strategy) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <BriefcaseMedical size={13} className="text-blue-500" />
                    Target Patient Appointment{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  {modalMode === "create" ? (
                    activeAppointments.length === 0 ? (
                      <div className="text-xs p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg flex items-start gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span>
                          No active appointments found. You need an active
                          appointment profile to attach records.
                        </span>
                      </div>
                    ) : (
                      <select
                        required
                        value={formData.appointmentId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            appointmentId: e.target.value,
                          })
                        }
                        className="w-full border border-slate-200 bg-white rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition cursor-pointer"
                      >
                        <option value="" disabled>
                          -- Choose an active patient schedule --
                        </option>
                        {activeAppointments.map((appt) => {
                          const apptDate = appt.date
                            ? new Date(appt.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "N/A";
                          return (
                            <option key={appt.id} value={appt.id}>
                              {appt.patient_name || "Ref ID"} #{appt.id} (
                              {apptDate} - {appt.time || "N/A"})
                            </option>
                          );
                        })}
                      </select>
                    )
                  ) : (
                    /* Read-Only text configuration block when in edit mode */
                    <div className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-3 py-2.5 text-xs font-medium flex items-center justify-between">
                      <span>Linked Appointment ID reference</span>
                      <span className="font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                        #{formData.appointmentId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Diagnosis Textarea Entry Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Diagnostic Summary & Core Findings{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Document clinical diagnosis summaries, observed primary indices, or target chronic data parameters..."
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnosis: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none leading-relaxed"
                  />
                </div>

                {/* Prescription Textarea Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Therapeutic Strategy & Dosage Charts{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g., Amoxicillin 500mg — 1 capsule every 8 hours for 7 days post meals."
                    value={formData.prescription}
                    onChange={(e) =>
                      setFormData({ ...formData, prescription: e.target.value })
                    }
                    className="w-full border border-slate-200 font-mono rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none leading-relaxed"
                  />
                </div>

                {/* Doctor Private Notes Section */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Internal Clinical Progress Notes{" "}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Private internal observations, scheduling remarks, or physical restriction details..."
                    value={formData.doctorNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, doctorNotes: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition resize-none leading-relaxed"
                  />
                </div>

                {/* Footer Drawer Action Elements Container */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      recordLoading ||
                      (modalMode === "create" &&
                        activeAppointments.length === 0)
                    }
                    className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition flex items-center gap-1.5"
                  >
                    {recordLoading && (
                      <LoaderCircle size={14} className="animate-spin" />
                    )}
                    <span>
                      {modalMode === "create" ? "Commit Entry" : "Save Changes"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
