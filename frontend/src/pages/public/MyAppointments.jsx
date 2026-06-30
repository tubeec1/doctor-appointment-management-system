import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  Clock,
  FileText,
  XCircle,
  Edit,
  LoaderCircle,
  AlertCircle,
  Stethoscope,
  DollarSign,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  getMyAppointments,
  cancelAppointment,
  clearAppointmentError,
  clearAppointmentMessage,
  selectMyAppointments,
  selectAppointmentLoading,
  selectAppointmentError,
  selectAppointmentMessage,
} from "../../features/appointments/appointmentSlice";

import {
  getDoctors,
  getDoctorById,
  selectDoctors,
  selectDoctor,
} from "../../features/doctors/doctorSlice";

import api from "../../api/axios";

const MyAppointments = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const appointments = useSelector(selectMyAppointments);
  const loading = useSelector(selectAppointmentLoading);
  const error = useSelector(selectAppointmentError);
  const message = useSelector(selectAppointmentMessage);

  const doctors = useSelector(selectDoctors);
  const currentSelectedDoctorData = useSelector(selectDoctor);

  // Modal State for Updates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [modalDoctorId, setModalDoctorId] = useState("");
  const [modalScheduleId, setModalScheduleId] = useState("");
  const [modalAppointmentDate, setModalAppointmentDate] = useState("");
  const [modalNotes, setModalNotes] = useState("");
  const [modalSubmitting, setModalSubmitting] = useState(false);

  // Initial Data Fetch
  useEffect(() => {
    dispatch(getMyAppointments());
    dispatch(getDoctors());
  }, [dispatch]);

  // Handle Notifications and State Cleans
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
    }
  }, [message, dispatch]);

  // Sync Doctor Changes in the Modal to Fetch Respective Schedules
  useEffect(() => {
    if (modalDoctorId) {
      dispatch(getDoctorById(modalDoctorId));
    }
  }, [modalDoctorId, dispatch]);

  // Cancel Handler
  const handleCancel = (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );
    if (confirmCancel) {
      dispatch(cancelAppointment(appointmentId));
    }
  };

  // Open Modal and Pre-populate with Current Appointment Values
  const openUpdateModal = (appointment) => {
    setEditingAppointmentId(appointment.id);
    setModalDoctorId(appointment.doctor_id || "");
    setModalScheduleId(appointment.schedule_id || "");

    // Format date string safely to YYYY-MM-DD for standard HTML inputs
    if (appointment.appointment_date) {
      const dateObj = new Date(appointment.appointment_date);
      const formattedDate = dateObj.toISOString().split("T")[0];
      setModalAppointmentDate(formattedDate);
    } else {
      setModalAppointmentDate("");
    }

    setModalNotes(appointment.notes || "");
    setIsModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setEditingAppointmentId(null);
    setModalDoctorId("");
    setModalScheduleId("");
    setModalAppointmentDate("");
    setModalNotes("");
  };

  // Submit Modal Updates via Manual Put Request
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!modalDoctorId) return toast.error("Please select a doctor.");
    if (!modalScheduleId)
      return toast.error("Please select an available schedule.");
    if (!modalAppointmentDate)
      return toast.error("Please select an appointment date.");

    try {
      setModalSubmitting(true);

      const updateData = {
        doctorId: Number(modalDoctorId),
        scheduleId: Number(modalScheduleId),
        appointmentDate: modalAppointmentDate,
        notes: modalNotes,
      };

      await api.put(`/appointments/${editingAppointmentId}`, updateData);

      toast.success("Appointment updated successfully.");
      closeUpdateModal();
      dispatch(getMyAppointments()); // Refresh list
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        "Failed to update appointment.";
      toast.error(errorMsg);
    } finally {
      setModalSubmitting(false);
    }
  };

  // Helper template method for styling status badges uniformly
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Helper method to clean up timestamps for clean scannability
  const formatDateString = (rawDate) => {
    if (!rawDate) return "N/A";
    const d = new Date(rawDate);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper method to strip seconds off the backend raw format (e.g. 09:00:00 -> 09:00)
  const formatTimeString = (timeStr) => {
    if (!timeStr) return "N/A";
    const splitStr = timeStr.split(":");
    if (splitStr.length >= 2) {
      return `${splitStr[0]}:${splitStr[1]}`;
    }
    return timeStr;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">My Appointments</h1>
            <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
              Track, organize, view, or modify your planned health visits and
              consults with our experienced medical experts.
            </p>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading && appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <LoaderCircle size={48} className="animate-spin text-blue-600" />
            <p className="text-gray-500 font-medium">
              Retrieving appointments...
            </p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-xl mx-auto border border-gray-100">
            <AlertCircle size={56} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Appointments Found
            </h3>
            <p className="text-gray-500 mb-6">
              You currently haven't booked any medical consultations or
              treatment visits.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {appointments.map((appointment) => {
              const isCancelled =
                appointment.status?.toLowerCase() === "cancelled" ||
                appointment.status?.toLowerCase() === "canceled";

              return (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header Banner Block */}
                    <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-500">
                          ID:
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          #{appointment.id}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status || "Pending"}
                      </span>
                    </div>

                    {/* Main Appointment Breakdown Card */}
                    <div className="p-6 space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                          <Stethoscope className="text-blue-600" size={28} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-slate-900">
                            Dr. {appointment.doctor_name || "Doctor"}
                          </h4>
                          <p className="text-blue-600 text-sm font-medium">
                            {appointment.specialization || "General Medicine"}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-green-600 text-sm font-bold">
                            <DollarSign size={14} />
                            <span>
                              {appointment.consultation_fee || "0.00"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="border-gray-100" />

                      {/* Schedule Data Block */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                          <CalendarDays size={18} className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-400 font-medium">
                              Date
                            </p>
                            <p className="font-semibold text-slate-800">
                              {formatDateString(appointment.appointment_date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-400 font-medium">
                              Timing Block
                            </p>
                            <p className="font-semibold text-slate-800">
                              {appointment.day_of_week
                                ? `${appointment.day_of_week} • `
                                : ""}
                              {formatTimeString(appointment.start_time)} -{" "}
                              {formatTimeString(appointment.end_time)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="bg-slate-50 p-3 rounded-xl flex gap-2 items-start border border-slate-100">
                          <FileText
                            size={16}
                            className="text-slate-400 mt-0.5 shrink-0"
                          />
                          <p className="text-xs text-gray-600 italic">
                            "{appointment.notes}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar Panel */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      disabled={isCancelled}
                      className="flex items-center justify-center gap-2 border border-red-200 bg-white text-red-600 rounded-xl py-2.5 font-semibold text-sm hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                    >
                      <XCircle size={16} />
                      Cancel Visit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyAppointments;
