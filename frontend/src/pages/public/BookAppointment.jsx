import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  ClipboardPen,
  LoaderCircle,
  CalendarDays,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getDoctors,
  getDoctorById,
  selectDoctors,
  selectDoctor,
  selectDoctorLoading,
} from "../../features/doctors/doctorSlice";

import {
  createAppointment,
  selectAppointmentLoading,
  selectAppointmentError,
  selectAppointmentMessage,
} from "../../features/appointments/appointmentSlice";

import { toast } from "react-hot-toast";

const BookAppointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctorId } = useParams();

  const doctors = useSelector(selectDoctors);
  const doctor = useSelector(selectDoctor);
  const doctorLoading = useSelector(selectDoctorLoading);

  const appointmentLoading = useSelector(selectAppointmentLoading);
  const appointmentError = useSelector(selectAppointmentError);
  const appointmentMessage = useSelector(selectAppointmentMessage);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(getDoctors());

    if (doctorId) {
      dispatch(getDoctorById(doctorId));
      setSelectedDoctor(doctorId);
    }
  }, [dispatch, doctorId]);

  useEffect(() => {
    if (appointmentError) {
      toast.error(appointmentError);
    }
  }, [appointmentError]);

  useEffect(() => {
    if (appointmentMessage) {
      toast.success(appointmentMessage);

      const timer = setTimeout(() => {
        navigate("/my-appointments");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [appointmentMessage, navigate]);

  const handleDoctorChange = (e) => {
    const id = e.target.value;
    setSelectedDoctor(id);
    setSelectedSchedule("");

    if (id) {
      dispatch(getDoctorById(id));
    }
  };

  const handleSubmit = () => {
    if (!selectedDoctor) {
      return toast.error("Please select a doctor.");
    }

    if (!selectedSchedule) {
      return toast.error("Please select an available schedule.");
    }

    if (!appointmentDate) {
      return toast.error("Please select an appointment date.");
    }

    dispatch(
      createAppointment({
        doctorId: Number(selectedDoctor),
        scheduleId: Number(selectedSchedule),
        appointmentDate,
        notes,
      }),
    );
  };

  if (doctorLoading && doctorId) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle size={45} className="animate-spin text-blue-600" />
          <p className="text-gray-500 font-medium">Loading Doctor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">Book Appointment</h1>
            <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
              Schedule an appointment with one of our experienced doctors.
              Select your preferred doctor, available schedule, date and submit
              your appointment request.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8">
                <ClipboardPen size={28} className="text-blue-600" />
                <h2 className="text-2xl font-bold">Appointment Information</h2>
              </div>

              {/* Doctor Selection */}
              <div className="mb-8">
                <label className="block font-semibold mb-3">
                  Select Doctor
                </label>
                <div className="relative">
                  <Stethoscope
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                  />
                  <select
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                    disabled={!!doctorId}
                    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {!doctorId && <option value="">Choose Doctor</option>}
                    {doctors.map((doc) => (
                      <option key={doc.doctor_id} value={doc.doctor_id}>
                        Dr. {doc.full_name} ({doc.specialization})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor Card */}
              {doctor && (
                <div className="border rounded-2xl p-6 bg-blue-50 mb-8">
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        doctor.profile_image
                          ? `http://localhost:5000/${doctor.profile_image}`
                          : "https://placehold.co/120"
                      }
                      alt={doctor.full_name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold">
                        Dr. {doctor.full_name}
                      </h3>
                      <p className="text-blue-700 mt-1">
                        {doctor.specialization}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {doctor.department_name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= Schedule ================= */}
              <div className="mb-8">
                <label className="block font-semibold mb-3">
                  Select Available Schedule
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                  />
                  <select
                    value={selectedSchedule}
                    onChange={(e) => setSelectedSchedule(e.target.value)}
                    disabled={
                      !doctor ||
                      !doctor.schedules ||
                      doctor.schedules.length === 0
                    }
                    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Schedule</option>
                    {doctor?.schedules?.map((schedule) => (
                      <option key={schedule.id} value={schedule.id}>
                        {schedule.day_of_week} • {schedule.start_time} -{" "}
                        {schedule.end_time}
                      </option>
                    ))}
                  </select>
                </div>

                {doctor?.schedules?.length === 0 && (
                  <p className="text-red-500 mt-3 text-sm">
                    This doctor currently has no available schedules.
                  </p>
                )}
              </div>

              {/* ================= Appointment Date ================= */}
              <div className="mb-8">
                <label className="block font-semibold mb-3">
                  Appointment Date
                </label>
                <div className="relative">
                  <CalendarDays
                    className="absolute left-4 top-4 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* ================= Notes ================= */}
              <div className="mb-8">
                <label className="block font-semibold mb-3">
                  Notes (Optional)
                </label>
                <textarea
                  rows={5}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your symptoms or reason for this appointment..."
                  className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div>
            <div className="sticky top-24">
              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">Appointment Summary</h2>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Doctor</span>
                    <span className="font-semibold">
                      {doctor ? `Dr. ${doctor.full_name}` : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Department</span>
                    <span className="font-semibold">
                      {doctor?.department_name || "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Specialization</span>
                    <span className="font-semibold">
                      {doctor?.specialization || "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-bold text-green-600">
                      {doctor ? `$${doctor.consultation_fee}` : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Schedule</span>
                    <span className="font-semibold">
                      {selectedSchedule ? "Selected" : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Appointment Date</span>
                    <span className="font-semibold">
                      {appointmentDate || "-"}
                    </span>
                  </div>

                  <hr />
                  {/* Buttons */}
                  <button
                    onClick={handleSubmit}
                    disabled={
                      appointmentLoading ||
                      !selectedDoctor ||
                      !selectedSchedule ||
                      !appointmentDate
                    }
                    className={`w-full rounded-xl py-4 font-semibold text-lg transition ${
                      appointmentLoading
                        ? "bg-blue-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {appointmentLoading
                      ? "Booking Appointment..."
                      : "Confirm Appointment"}
                  </button>

                  <button
                    onClick={() => navigate("/doctors")}
                    className="w-full border border-blue-600 text-blue-600 rounded-xl py-4 font-semibold hover:bg-blue-50 transition"
                  >
                    Browse Doctors
                  </button>
                </div>
              </div>

              {/* Information */}
              <div className="bg-blue-50 rounded-2xl p-6 mt-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Appointment Information
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-2">
                    <Calendar size={18} className="text-blue-600 mt-1" />
                    <span>
                      Select a preferred available schedule before booking.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Clock size={18} className="text-blue-600 mt-1" />
                    <span>
                      Please arrive at least 15 minutes before your appointment.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <User size={18} className="text-blue-600 mt-1" />
                    <span>
                      Bring your identification and any previous medical
                      records.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <ClipboardPen size={18} className="text-blue-600 mt-1" />
                    <span>
                      Adding notes helps the doctor prepare before your visit.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Selected Doctor */}
              {doctor && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        doctor.profile_image
                          ? `http://localhost:5000/${doctor.profile_image}`
                          : "https://placehold.co/100"
                      }
                      alt={doctor.full_name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        Dr. {doctor.full_name}
                      </h3>
                      <p className="text-blue-600">{doctor.specialization}</p>
                      <p className="text-sm text-gray-500">
                        {doctor.department_name}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
