import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedicalRecords,
  deleteMedicalRecord,
  clearMedicalRecordError,
  clearMedicalRecordMessage,
  selectMedicalRecords,
  selectMedicalRecordLoading,
  selectMedicalRecordError,
  selectMedicalRecordMessage,
} from "../../features/medicalRecords/medicalRecordSlice";
import {
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Trash2,
  FileText,
  User,
  Activity,
  HeartPulse,
  Pill,
  Calendar,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

const MedicalRecords = () => {
  const dispatch = useDispatch();

  // Redux System Selectors
  const records = useSelector(selectMedicalRecords) || [];
  const isLoading = useSelector(selectMedicalRecordLoading);
  const error = useSelector(selectMedicalRecordError);
  const message = useSelector(selectMedicalRecordMessage);

  // Local Layout States
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Initial Sync Lifecycle
  useEffect(() => {
    dispatch(getMedicalRecords());
  }, [dispatch]);

  // Toast / Status auto-clearing triggers
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearMedicalRecordError()), 5000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(
        () => dispatch(clearMedicalRecordMessage()),
        4000,
      );
      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);

  // Safe window.confirm Operational Record Purging
  const handleDeleteClick = async (recordId) => {
    const isConfirmed = window.confirm(
      "CRITICAL ACTION: Are you sure you want to permanently delete this clinical medical record from the hospital directory? This administrative override cannot be undone.",
    );

    if (!isConfirmed) return;

    setDeletingId(recordId);
    try {
      await dispatch(deleteMedicalRecord(recordId)).unwrap();
    } catch (err) {
      // Handled implicitly by redux builder configurations
    } finally {
      setDeletingId(null);
    }
  };

  // Safe field parsing for data matching fallback structures
  const filteredRecords = records.filter((item) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();

    const patientName = (
      item?.Patient?.fullName ||
      item?.Patient?.full_name ||
      item?.patient_name ||
      ""
    ).toLowerCase();
    const doctorName = (
      item?.Doctor?.fullName ||
      item?.Doctor?.full_name ||
      item?.doctor_name ||
      ""
    ).toLowerCase();
    const diagnosis = (item?.diagnosis || "").toLowerCase();
    const treatment = (item?.treatment || "").toLowerCase();

    return (
      patientName.includes(query) ||
      doctorName.includes(query) ||
      diagnosis.includes(query) ||
      treatment.includes(query)
    );
  });

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans antialiased">
      {/* GLOBAL SYSTEM STATUS NOTIFICATION HUD */}
      <div className="fixed top-6 right-6 z-50 space-y-3 max-w-sm w-full pointer-events-none">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl shadow-lg flex items-start gap-3 pointer-events-auto animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={16} />
            <div className="text-xs font-semibold leading-relaxed">{error}</div>
          </div>
        )}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl shadow-lg flex items-start gap-3 pointer-events-auto animate-in fade-in slide-in-from-top-4">
            <CheckCircle2
              className="text-emerald-600 shrink-0 mt-0.5"
              size={16}
            />
            <div className="text-xs font-semibold leading-relaxed">
              {message}
            </div>
          </div>
        )}
      </div>

      {/* DASHBOARD CONSOLE ROW HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="text-indigo-600" size={24} />
            Centralized Medical Records
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            System administration interface to monitor clinical diagnoses, drug
            orders, and health metrics.
          </p>
        </div>

        <button
          onClick={() => dispatch(getMedicalRecords())}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all disabled:opacity-60"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          Sync Records File
        </button>
      </div>

      {/* FILTER SEARCH SYSTEM ELEMENTS */}
      <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <Search className="text-slate-400 shrink-0" size={16} />
          <input
            type="text"
            placeholder="Search records by patient name, treating doctor, symptoms, or diagnoses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none border-none placeholder:text-slate-400"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 whitespace-nowrap px-2"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* RENDER LOGIC FLOW BLOCK */}
      {isLoading && records.length === 0 ? (
        <div className="p-24 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-sm">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Loading System Patient Charts...
          </p>
        </div>
      ) : filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredRecords.map((item) => {
            const patient = item?.Patient || item?.patient;
            const doctor = item?.Doctor || item?.doctor;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Card Section Header: Entities & Primary IDs */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-4 pr-10 mb-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-3 bg-slate-100 text-slate-600 rounded-xl shrink-0">
                        <User size={18} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                          Patient Identification
                        </span>
                        <h3 className="text-sm font-black text-slate-900 truncate mt-0.5">
                          {patient?.fullName ||
                            patient?.full_name ||
                            item?.patient_name ||
                            `ID: #${item?.patientId || "Unknown"}`}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <Stethoscope size={12} className="text-indigo-500" />
                          By:{" "}
                          {doctor?.fullName ||
                          doctor?.full_name ||
                          item?.doctor_name
                            ? `Dr. ${doctor?.fullName || doctor?.full_name || item?.doctor_name}`
                            : `Staff ID #${item?.doctorId}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Core Medical Data Arrays (Diagnosis / Treatment) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Diagnosis Panel Component */}
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                        <HeartPulse size={13} className="text-rose-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Clinical Diagnosis
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-normal">
                        {item?.diagnosis || "No specific diagnosis listed"}
                      </p>
                    </div>

                    {/* Treatment / Therapeutics Component */}
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                        <Activity size={13} className="text-indigo-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Applied Treatment
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-normal">
                        {item?.treatment || "No treatment log itemized"}
                      </p>
                    </div>
                  </div>

                  {/* Supplemental Metadata Section (Prescriptions / Metrics / Notes) */}
                  <div className="space-y-2.5">
                    {/* Prescriptions Text Line */}
                    {item?.prescription && (
                      <div className="flex items-start gap-2 text-xs font-semibold px-1">
                        <Pill
                          size={14}
                          className="text-emerald-600 mt-0.5 shrink-0"
                        />
                        <div className="text-slate-600">
                          <span className="text-slate-400 font-bold text-[11px]">
                            Prescription Orders:{" "}
                          </span>
                          <span className="text-slate-800 font-medium">
                            {item.prescription}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* General Diagnostic Comments & Notes */}
                    {item?.notes && (
                      <div className="flex items-start gap-2 text-xs font-semibold px-1">
                        <FileText
                          size={14}
                          className="text-amber-600 mt-0.5 shrink-0"
                        />
                        <div className="text-slate-600">
                          <span className="text-slate-400 font-bold text-[11px]">
                            Enclosed Lab Notes:{" "}
                          </span>
                          <span className="text-slate-600 font-medium italic">
                            "{item.notes}"
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Element Metadata Banner */}
                <div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-3 text-[11px] font-bold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>
                      Recorded: {item?.createdAt || item?.date || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span>
                      Ref File ID:{" "}
                      <span className="text-slate-600 font-mono">
                        #{item.id}
                      </span>
                    </span>
                  </div>
                </div>

                {/* System Purge Float Button Layer */}
                <div className="absolute top-5 right-5">
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    disabled={deletingId === item.id}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition-all"
                    title="Purge Clinical File"
                  >
                    {deletingId === item.id ? (
                      <Loader2
                        size={15}
                        className="animate-spin text-rose-600"
                      />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-16 bg-white rounded-2xl border border-dashed border-slate-200 shadow-inner">
          <FileText size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-400">
            No medical documentation indices matched your filter guidelines.
          </p>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
