import React, { useEffect } from "react";
import {
  Calendar,
  Clock,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  BriefcaseMedical,
  Star,
  User,
  Award,
  LoaderCircle,
  DollarSign,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getDoctorById,
  selectDoctor,
  selectDoctorError,
  selectDoctorLoading,
} from "../../features/doctors/doctorSlice";

const DoctorDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const doctor = useSelector(selectDoctor);

  const loading = useSelector(selectDoctorLoading);

  const error = useSelector(selectDoctorError);

  useEffect(() => {
    dispatch(getDoctorById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle size={45} className="animate-spin text-blue-600" />

          <p className="text-gray-500 font-medium">
            Loading Doctor Information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Failed to load doctor
          </h2>

          <p className="mt-3 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Doctor Image */}

            <div className="flex justify-center">
              <div className="w-72 h-72 rounded-3xl overflow-hidden bg-white shadow-2xl">
                <img
                  src={
                    doctor.profile_image
                      ? `http://localhost:5000/${doctor.profile_image}`
                      : "https://placehold.co/600x600?text=Doctor"
                  }
                  alt={doctor.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Doctor Information */}

            <div className="lg:col-span-2 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                <Award size={16} />
                Professional Healthcare Specialist
              </div>

              <h1 className="text-5xl font-bold mt-6">
                Dr. {doctor.full_name}
              </h1>

              <p className="text-blue-100 text-xl mt-3">
                {doctor.specialization}
              </p>

              <div className="flex flex-wrap gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <BriefcaseMedical size={20} />

                  <span>{doctor.department_name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <GraduationCap size={20} />

                  <span>Licensed Medical Doctor</span>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />

                  <span>4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}

      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <User className="text-blue-600 mb-4" />

            <h3 className="text-3xl font-bold">1200+</h3>

            <p className="text-gray-500 mt-1">Happy Patients</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <BriefcaseMedical className="text-green-600 mb-4" />

            <h3 className="text-3xl font-bold">{doctor.experience_years}+</h3>

            <p className="text-gray-500 mt-1">Years Experience</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <DollarSign className="text-cyan-600 mb-4" />

            <h3 className="text-3xl font-bold">${doctor.consultation_fee}</h3>

            <p className="text-gray-500 mt-1">Consultation Fee</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Calendar className="text-purple-600 mb-4" />

            <h3 className="text-3xl font-bold">
              {doctor.schedules?.length || 0}
            </h3>

            <p className="text-gray-500 mt-1">Available Schedules</p>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}

          <div className="lg:col-span-2 space-y-8">
            {/* About */}

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                About Doctor
              </h2>

              <p className="text-gray-600 leading-8">{doctor.bio}</p>
            </div>

            {/* Department */}

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Department</h2>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-xl text-blue-700">
                  {doctor.department_name}
                </h3>

                <p className="text-gray-600 mt-3">
                  {doctor.department_description}
                </p>
              </div>
            </div>

            {/* Professional Experience */}

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">
                Professional Experience
              </h2>

              <div className="flex gap-5">
                <div className="bg-cyan-100 p-3 rounded-xl h-fit">
                  <BriefcaseMedical className="text-cyan-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {doctor.experience_years} Years of Medical Experience
                  </h3>

                  <p className="text-gray-600 mt-3 leading-8">
                    Specialized in {doctor.specialization} with years of
                    practical experience providing compassionate, accurate and
                    patient-focused healthcare.
                  </p>
                </div>
              </div>
            </div>
            {/* ================= Available Schedules ================= */}

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  Available Schedules
                </h2>

                <Clock className="text-blue-600" />
              </div>

              {doctor.schedules && doctor.schedules.length > 0 ? (
                <div className="space-y-5">
                  {doctor.schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            {schedule.day_of_week}
                          </h3>

                          <p className="text-gray-500 mt-2">
                            Available Consultation Time
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-blue-600" />

                          <span className="font-semibold text-slate-700">
                            {schedule.start_time} - {schedule.end_time}
                          </span>
                        </div>

                        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                          Available
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14">
                  <Calendar size={60} className="mx-auto text-gray-300 mb-4" />

                  <h3 className="text-xl font-semibold">
                    No Available Schedule
                  </h3>

                  <p className="text-gray-500 mt-3">
                    This doctor hasn't published any consultation schedules yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}

          <div className="space-y-8">
            {/* Contact Information */}

            <div className="bg-white rounded-2xl shadow-sm p-7">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="text-blue-600" />

                  <div>
                    <p className="text-sm text-gray-400">Email Address</p>

                    <p className="font-medium">{doctor.email}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-green-600" />

                  <div>
                    <p className="text-sm text-gray-400">Phone Number</p>

                    <p className="font-medium">
                      {doctor.phone || "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-red-500" />

                  <div>
                    <p className="text-sm text-gray-400">Address</p>

                    <p className="font-medium">
                      {doctor.address || "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <User className="text-purple-600" />

                  <div>
                    <p className="text-sm text-gray-400">Nationality</p>

                    <p className="font-medium">{doctor.nationality}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Fee */}

            <div className="bg-white rounded-2xl shadow-sm p-7">
              <h2 className="text-xl font-bold mb-5">Consultation Fee</h2>

              <div className="bg-green-50 rounded-xl p-6 text-center">
                <DollarSign className="mx-auto text-green-600 mb-3" size={35} />

                <h3 className="text-4xl font-bold text-green-700">
                  ${doctor.consultation_fee}
                </h3>

                <p className="text-gray-500 mt-2">Per Consultation</p>
              </div>
            </div>

            {/* Department */}

            <div className="bg-white rounded-2xl shadow-sm p-7">
              <h2 className="text-xl font-bold mb-5">Department</h2>

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-blue-700">
                  {doctor.department_name}
                </h3>

                <p className="text-sm text-gray-600 mt-2">
                  {doctor.department_description}
                </p>
              </div>
            </div>
            {/* ================= Book Appointment Card ================= */}

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white">
                <h2 className="text-2xl font-bold">Book Appointment</h2>

                <p className="text-blue-100 mt-2">
                  Schedule an appointment with Dr. {doctor.full_name}
                </p>
              </div>

              <div className="p-8">
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Doctor</span>

                    <span className="font-semibold">
                      Dr. {doctor.full_name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Specialization</span>

                    <span className="font-semibold">
                      {doctor.specialization}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Department</span>

                    <span className="font-semibold">
                      {doctor.department_name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Experience</span>

                    <span className="font-semibold">
                      {doctor.experience_years} Years
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Consultation Fee</span>

                    <span className="font-bold text-green-600">
                      ${doctor.consultation_fee}
                    </span>
                  </div>

                  <hr />

                  <button
                    onClick={() =>
                      navigate(`/book-appointment/${doctor.doctor_id}`)
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-xl py-4 font-semibold text-lg"
                  >
                    Book Appointment
                  </button>

                  <button
                    onClick={() => navigate("/doctors")}
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl py-4 font-semibold transition duration-300"
                  >
                    Back to Doctors
                  </button>
                </div>
              </div>
            </div>

            {/* ================= Why Choose This Doctor ================= */}

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-7 border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-5">
                Why Choose This Doctor?
              </h3>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center gap-3">
                  <Award className="text-blue-600" size={18} />
                  Licensed & Experienced Medical Professional
                </li>

                <li className="flex items-center gap-3">
                  <BriefcaseMedical className="text-green-600" size={18} />
                  Specialized in {doctor.specialization}
                </li>

                <li className="flex items-center gap-3">
                  <Clock className="text-purple-600" size={18} />
                  Flexible Consultation Schedule
                </li>

                <li className="flex items-center gap-3">
                  <Star className="text-yellow-500 fill-yellow-500" size={18} />
                  Highly Rated by Patients
                </li>

                <li className="flex items-center gap-3">
                  <User className="text-cyan-600" size={18} />
                  Patient-Centered Healthcare
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDetails;
