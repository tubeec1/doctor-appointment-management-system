import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointments,
  deleteAppointment,
  clearAppointmentError,
  clearAppointmentMessage,
  selectAppointments,
  selectAppointmentLoading,
  selectAppointmentError,
  selectAppointmentMessage,
} from "../../features/appointments/appointmentSlice";
import {
  Calendar,
  Clock,
  Trash2,
  User,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  FileText,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

const Appointments = () => {
  const dispatch = useDispatch();

  // Redux State Bindings
  const appointments = useSelector(selectAppointments) || [];
  const isLoading = useSelector(selectAppointmentLoading);
  const error = useSelector(selectAppointmentError);
  const message = useSelector(selectAppointmentMessage);

  // Local Layout States
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch target data on initialization
  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  // Handle transient auto-clearing message banners
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearAppointmentError()), 5000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => dispatch(clearAppointmentMessage()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);

  // Confirmed Record Purge Handler via window.confirm
  const handleDeleteClick = async (appointmentId) => {
    const isConfirmed = window.confirm(
      "Are you certain you want to permanently delete this appointment from the administration systems? This operational task cannot be reversed.",
    );

    if (!isConfirmed) return;

    setDeletingId(appointmentId);
    try {
      await dispatch(deleteAppointment(appointmentId)).unwrap();
    } catch (err) {
      // Error handles implicitly through slice state maps
    } finally {
      setDeletingId(null);
    }
  };

  // Safe client-side search normalization checks
  const filteredAppointments = appointments.filter((item) => {
    if (!searchQuery) return true;

    const lowerQuery = searchQuery.toLowerCase();

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
    const notesContent = (item?.notes || "").toLowerCase();

    return (
      patientName.includes(lowerQuery) ||
      doctorName.includes(lowerQuery) ||
      notesContent.includes(lowerQuery)
    );
  });

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans antialiased">
      {/* FIXED FLOATING NOTIFICATION BANNER STRIPS */}
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

      {/* DASHBOARD CONSOLE TITLE SEGMENT */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="text-blue-600" size={24} />
            Admin Appointment Overview
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Review live system bookings, access critical patient logs, or clean
            outdated registries.
          </p>
        </div>

        <button
          onClick={() => dispatch(getAppointments())}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all disabled:opacity-60"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          Refresh Database
        </button>
      </div>

      {/* SEARCH AND CONTROL BAR */}
      <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <Search className="text-slate-400 shrink-0" size={16} />
          <input
            type="text"
            placeholder="Search bookings by doctor, patient, or notes keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none border-none placeholder:text-slate-400"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap px-2"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* REGISTRY CONTENT ELEMENT SWITCH LAYOUT */}
      {isLoading && appointments.length === 0 ? (
        <div className="p-24 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-sm">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Fetching Global System Deployments...
          </p>
        </div>
      ) : filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAppointments.map((item) => {
            const patient = item?.Patient || item?.patient;
            const doctor = item?.Doctor || item?.doctor;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4 relative group"
              >
                {/* Header Information Grid Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100 pb-4 pr-10">
                  {/* Patient Info Column */}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl shrink-0">
                      <User size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                        Patient Details
                      </span>
                      <h3 className="text-xs font-black text-slate-900 truncate">
                        {patient?.fullName ||
                          patient?.full_name ||
                          item?.patient_name ||
                          `User ID: #${item?.patientId}`}
                      </h3>
                    </div>
                  </div>

                  {/* Doctor Info Column */}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                      <Stethoscope size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                        Assigned Practitioner
                      </span>
                      <h3 className="text-xs font-black text-slate-900 truncate">
                        {doctor?.fullName ||
                        doctor?.full_name ||
                        item?.doctor_name
                          ? `Dr. ${doctor?.fullName || doctor?.full_name || item?.doctor_name}`
                          : `Doctor ID: #${item?.doctorId}`}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Date & Core Parameters Metadata Array */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-slate-900 font-bold">
                      {item?.appointmentDate || "Unassigned Date"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Clock size={13} className="text-slate-400" />
                      <span>
                        Slot ID:{" "}
                        <b className="text-slate-700">
                          #{item?.scheduleId || "N/A"}
                        </b>
                      </span>
                    </div>

                    {item?.status && (
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] border uppercase ${
                          String(item.status).toLowerCase() === "approved"
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : String(item.status).toLowerCase() === "completed"
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : String(item.status).toLowerCase() ===
                                  "cancelled"
                                ? "bg-rose-50 border-rose-200 text-rose-700"
                                : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Patient Contextual Notes Field */}
                {item?.notes && (
                  <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-3 flex gap-2.5 items-start">
                    <FileText
                      size={14}
                      className="text-slate-400 mt-0.5 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Notes Statement:
                      </span>
                      <p className="text-[11px] font-medium leading-relaxed text-slate-600 italic">
                        "{item.notes}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Inline Actions Dashboard Layer Container */}
                <div className="absolute top-5 right-5">
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    disabled={deletingId === item.id}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition-all"
                    title="Purge Appointment Entry"
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
          <Calendar size={32} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-400">
            No active appointments found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Appointments;
