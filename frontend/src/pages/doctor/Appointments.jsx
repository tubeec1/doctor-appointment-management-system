import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Search,
  User,
  Phone,
  AlertCircle,
  LoaderCircle,
  RefreshCw,
  MoreVertical,
  Check,
  Ban,
  FileText,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  getDoctorAppointments,
  updateAppointmentStatus,
  clearAppointmentError,
  clearAppointmentMessage,
  selectDoctorAppointments,
  selectAppointmentLoading,
  selectAppointmentError,
  selectAppointmentMessage,
} from "../../features/appointments/appointmentSlice"; // Adjust path to fit project file hierarchy

const Appointments = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const appointments = useSelector(selectDoctorAppointments);
  const loading = useSelector(selectAppointmentLoading);
  const error = useSelector(selectAppointmentError);
  const message = useSelector(selectAppointmentMessage);

  // Local Component States
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Initial Sync Data Fetch
  useEffect(() => {
    dispatch(getDoctorAppointments());
  }, [dispatch]);

  // Global Toast Notification Receivers
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAppointmentError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearAppointmentMessage());
      setActiveDropdown(null); // Close active dropdown context menus on success
    }
  }, [message, dispatch]);

  const handleRefresh = () => {
    dispatch(getDoctorAppointments());
  };

  const handleStatusUpdate = (appointmentId, status) => {
    // Passes exact API-compliant strings: 'Pending' | 'Approved' | 'Completed' | 'Cancelled'
    dispatch(updateAppointmentStatus({ appointmentId, status }));
  };

  // Status Badge Styling Matrix
  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Safe processing helper array
  const appointmentsList = appointments || [];

  // Filter and Search Pipeline Logic
  const filteredAppointments = appointmentsList.filter((app) => {
    const matchesTab = activeTab === "all" || app.status === activeTab;

    const patientName = app.patient_name || "";
    const patientPhone = app.patient_phone || "";
    const appointmentNotes = app.notes || "";

    const matchesSearch =
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientPhone.includes(searchQuery) ||
      appointmentNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id?.toString().includes(searchQuery);

    return matchesTab && matchesSearch;
  });

  // Derived state counts for functional dashboard indicators
  const countByStatus = (status) =>
    appointmentsList.filter((a) => a.status === status).length;

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Dynamic Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Patient Appointments
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review, approve, fulfill, or manage medical consultations and
              scheduling slots.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 transition disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={`${loading && !activeDropdown ? "animate-spin" : ""} text-slate-500`}
            />
            <span>Sync Content</span>
          </button>
        </div>

        {/* Filters Matrix Card Wrapper */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm mb-6 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Tab Navigation Switches */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              {
                id: "all",
                label: "All Sessions",
                count: appointmentsList.length,
              },
              {
                id: "Pending",
                label: "Pending",
                count: countByStatus("Pending"),
              },
              {
                id: "Approved",
                label: "Approved",
                count: countByStatus("Approved"),
              },
              {
                id: "Completed",
                label: "Completed",
                count: countByStatus("Completed"),
              },
              {
                id: "Cancelled",
                label: "Cancelled",
                count: countByStatus("Cancelled"),
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveDropdown(null);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap border ${
                  activeTab === tab.id
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-white border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Core Functional Search Bar Inputs */}
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, note, or phone..."
              className="w-full bg-slate-50/60 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition"
            />
          </div>
        </div>

        {/* Main Appointment Records Panel Structure Grid */}
        {loading && appointmentsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200/80 rounded-xl">
            <LoaderCircle
              size={32}
              className="animate-spin text-blue-600 stroke-[2.5]"
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Fetching scheduled calendars...
            </p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-xl px-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <AlertCircle size={20} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              No matching appointments
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              We couldn't track down matching schedules based on your active
              filter constraints or search text query targets.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAppointments.map((appointment) => {
              const currentStatus = appointment.status;

              // Formatting dates from backend ISO format safely
              const appointmentDate = appointment.appointment_date
                ? new Date(appointment.appointment_date).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )
                : "N/A";

              // Formatting time layout display window strings
              const displayTime =
                appointment.start_time && appointment.end_time
                  ? `${appointment.start_time.substring(0, 5)} - ${appointment.end_time.substring(0, 5)}`
                  : "N/A";

              return (
                <div
                  key={appointment.id}
                  className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 relative flex flex-col justify-between"
                >
                  <div>
                    {/* Card Section Header Layout */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${getStatusBadgeStyles(appointment.status)}`}
                        >
                          {appointment.status || "Pending"}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-mono mt-1">
                          ID: #{appointment.id}
                        </span>
                      </div>

                      {/* Dropdown Functional Interactivity Controls */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === appointment.id
                                ? null
                                : appointment.id,
                            )
                          }
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {activeDropdown === appointment.id && (
                          <>
                            {/* Overlay capture menu matrix wrapper */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveDropdown(null)}
                            />

                            <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 text-xs text-slate-700">
                              <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                                Update Status
                              </div>

                              {currentStatus !== "Approved" &&
                                currentStatus !== "Completed" && (
                                  <button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        appointment.id,
                                        "Approved",
                                      )
                                    }
                                    className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 transition"
                                  >
                                    <Check
                                      size={14}
                                      className="text-emerald-600"
                                    />
                                    <span>Approve Slot</span>
                                  </button>
                                )}

                              {currentStatus !== "Completed" &&
                                currentStatus !== "Cancelled" && (
                                  <button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        appointment.id,
                                        "Completed",
                                      )
                                    }
                                    className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 transition"
                                  >
                                    <CheckCircle2
                                      size={14}
                                      className="text-blue-600"
                                    />
                                    <span>Mark Completed</span>
                                  </button>
                                )}

                              {currentStatus !== "Cancelled" &&
                                currentStatus !== "Completed" && (
                                  <button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        appointment.id,
                                        "Cancelled",
                                      )
                                    }
                                    className="w-full text-left px-3 py-1.5 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2 text-rose-600 transition"
                                  >
                                    <Ban size={14} className="text-rose-600" />
                                    <span>Cancel Session</span>
                                  </button>
                                )}

                              {(currentStatus === "Completed" ||
                                currentStatus === "Cancelled") && (
                                <div className="px-3 py-1.5 text-slate-400 italic text-[11px]">
                                  No actions available
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Patient Context Details Profile Layout */}
                    <div className="space-y-3 mb-4 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 flex-shrink-0">
                          <User size={15} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 leading-tight truncate">
                            {appointment.patient_name || "Unknown Patient"}
                          </h4>
                          <span className="inline-block px-1.5 py-0.2 mt-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                            {appointment.patient_gender || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Phone metadata info link */}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone
                          size={13}
                          className="text-slate-400 flex-shrink-0"
                        />
                        <span>
                          {appointment.patient_phone || "No phone added"}
                        </span>
                      </div>

                      {/* Patient-provided session clinical notes */}
                      {appointment.notes && (
                        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-start gap-2">
                          <FileText
                            size={13}
                            className="text-slate-400 mt-0.5 flex-shrink-0"
                          />
                          <p className="text-xs text-slate-600 italic line-clamp-2 leading-relaxed">
                            "{appointment.notes}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calendar details operational bottom footer layout */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-lg p-2.5 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-1.5 border-r border-slate-200/80 pr-1.5 min-w-0">
                      <Calendar
                        size={14}
                        className="text-slate-400 flex-shrink-0"
                      />
                      <span className="truncate">{appointmentDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-0.5 min-w-0">
                      <Clock
                        size={14}
                        className="text-slate-400 flex-shrink-0"
                      />
                      <span
                        className="truncate"
                        title={`${appointment.day_of_week}: ${displayTime}`}
                      >
                        {displayTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
