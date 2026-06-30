import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Stethoscope,
  Award,
  Calendar,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getDoctors,
  selectDoctors,
  selectDoctorLoading,
  selectDoctorError,
} from "../../features/doctors/doctorSlice";

const Doctors = () => {
  const dispatch = useDispatch();

  const doctors = useSelector(selectDoctors);
  const loading = useSelector(selectDoctorLoading);
  const error = useSelector(selectDoctorError);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const filteredDoctors = useMemo(() => {
    const keyword = search.toLowerCase();

    return doctors.filter((doctor) => {
      return (
        doctor.full_name?.toLowerCase().includes(keyword) ||
        doctor.specialization?.toLowerCase().includes(keyword)
      );
    });
  }, [doctors, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.15),transparent_40%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,.15),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              <Stethoscope size={14} />
              Our Specialists
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-black leading-tight text-white">
              Meet Our
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Professional Doctors
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Find experienced specialists from every department. Book
              appointments with trusted doctors dedicated to providing
              exceptional healthcare services.
            </p>
          </div>

          {/* Statistics */}

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <Users className="mb-4 text-cyan-400" size={32} />

              <h2 className="text-4xl font-black text-white">
                {doctors.length}+
              </h2>

              <p className="mt-2 text-slate-400">Professional Doctors</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <Award className="mb-4 text-blue-400" size={32} />

              <h2 className="text-4xl font-black text-white">10+</h2>

              <p className="mt-2 text-slate-400">Years Experience</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <HeartPulse className="mb-4 text-cyan-400" size={32} />

              <h2 className="text-4xl font-black text-white">24/7</h2>

              <p className="mt-2 text-slate-400">Patient Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Find Your Doctor
              </h2>

              <p className="mt-2 text-slate-500">
                Search by doctor name or specialization.
              </p>
            </div>

            <div className="relative w-full lg:w-[420px]">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-4 pl-14 pr-5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= DOCTORS ================= */}

      {/* ================= Doctors Section ================= */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm"
                >
                  <div className="h-60 animate-pulse bg-slate-200" />

                  <div className="space-y-4 p-5">
                    <div className="h-6 rounded bg-slate-200 animate-pulse" />
                    <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
                    <div className="h-4 rounded bg-slate-200 animate-pulse" />
                    <div className="flex gap-2">
                      <div className="h-8 w-20 rounded-full bg-slate-200 animate-pulse" />
                      <div className="h-8 w-20 rounded-full bg-slate-200 animate-pulse" />
                    </div>
                    <div className="h-11 rounded-xl bg-slate-200 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-16 text-center">
              <Users className="mx-auto mb-6 text-red-400" size={60} />

              <h2 className="text-3xl font-bold text-red-700">
                Failed to Load Doctors
              </h2>

              <p className="mt-4 text-red-500">{error}</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="rounded-3xl bg-white p-20 text-center shadow-sm">
              <Users className="mx-auto mb-6 text-slate-300" size={70} />

              <h2 className="text-3xl font-bold text-slate-900">
                No Doctors Found
              </h2>

              <p className="mt-3 text-slate-500">
                Try another doctor name or specialization.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDoctors.map((doctor) => {
                const image = doctor.profile_image
                  ? `http://localhost:5000/${doctor.profile_image}`
                  : "https://via.placeholder.com/500x500?text=Doctor";

                return (
                  <div
                    key={doctor.id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Image */}

                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={image}
                        alt={doctor.full_name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent" />

                      {doctor.is_active === 1 && (
                        <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow">
                          Available
                        </span>
                      )}

                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">
                          Dr. {doctor.full_name}
                        </h3>

                        <p className="text-sm text-blue-200">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>

                    {/* Body */}

                    <div className="flex flex-1 flex-col p-5">
                      <p className="line-clamp-2 text-sm leading-7 text-slate-500">
                        {doctor.bio ||
                          "Experienced medical specialist providing quality healthcare with compassionate patient care."}
                      </p>

                      {/* Statistics */}

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-slate-50 p-3 text-center">
                          <p className="text-xs uppercase text-slate-400">
                            Experience
                          </p>

                          <h4 className="mt-1 font-bold text-blue-700">
                            {doctor.experience_years} Years
                          </h4>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-3 text-center">
                          <p className="text-xs uppercase text-slate-400">
                            Fee
                          </p>

                          <h4 className="mt-1 font-bold text-emerald-600">
                            ${doctor.consultation_fee}
                          </h4>
                        </div>
                      </div>

                      {/* Tags */}

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {doctor.gender}
                        </span>

                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                          {doctor.nationality}
                        </span>
                      </div>

                      {/* Button */}

                      <div className="mt-auto pt-6">
                        <Link
                          to={`/doctor-details/${doctor.doctor_id}`}
                          className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 py-3 font-semibold text-white transition hover:shadow-lg"
                        >
                          View Profile
                          <ArrowRight
                            size={18}
                            className="ml-2 transition group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 py-24">
        {/* Background Effects */}

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 font-semibold text-cyan-300">
            <HeartPulse className="h-5 w-5" />
            Trusted Healthcare Platform
          </span>

          <h2 className="mt-8 text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Find Your
            <span className="text-cyan-300"> Perfect Doctor</span>
            <br />
            Today
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-100">
            Browse experienced specialists, compare consultation fees, explore
            doctor profiles, and schedule appointments in minutes. DoctorCare
            makes quality healthcare simple and accessible.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">
            <Link
              to="/appointments"
              className="rounded-2xl bg-white px-10 py-4 text-lg font-bold text-blue-700 shadow-xl transition hover:bg-blue-50"
            >
              Book Appointment
            </Link>

            <Link
              to="/departments"
              className="rounded-2xl border border-white/30 px-10 py-4 text-lg font-bold text-white transition hover:bg-white/10"
            >
              Browse Departments
            </Link>
          </div>

          {/* Statistics */}

          <div className="mt-20 grid grid-cols-2 gap-10 md:grid-cols-4">
            <div>
              <h3 className="text-4xl font-extrabold text-white">
                {doctors.length}+
              </h3>

              <p className="mt-2 text-blue-200">Specialists</p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-white">30+</h3>

              <p className="mt-2 text-blue-200">Departments</p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-white">15K+</h3>

              <p className="mt-2 text-blue-200">Happy Patients</p>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-white">24/7</h3>

              <p className="mt-2 text-blue-200">Healthcare Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
