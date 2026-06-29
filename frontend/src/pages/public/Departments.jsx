import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Search,
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  Users,
  HeartPulse,
} from "lucide-react";

import {
  getDepartments,
  selectDepartments,
  selectDepartmentLoading,
} from "../../features/departments/departmentSlice";

const Departments = () => {
  const dispatch = useDispatch();

  const departments = useSelector(selectDepartments);
  const loading = useSelector(selectDepartmentLoading);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        {/* background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.20),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,.15),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              <Building2 className="w-4 h-4" />
              Medical Departments
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
              Find the Right
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                Medical Department
              </span>
            </h1>

            <p className="mt-8 text-lg text-slate-300 leading-8 max-w-3xl mx-auto">
              DoctorCare provides access to specialized medical departments
              staffed by experienced physicians and healthcare professionals.
              Browse our departments and quickly connect with the care you need.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-white font-semibold shadow-xl transition hover:-translate-y-1"
              >
                Find Doctors
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-white hover:bg-white/10 transition"
              >
                Book Appointment
              </Link>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <Building2 className="mx-auto mb-3 w-7 h-7 text-cyan-300" />

                <h3 className="text-3xl font-black text-white">
                  {loading ? "--" : departments.length}
                </h3>

                <p className="text-sm text-slate-400 mt-2">Departments</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <Users className="mx-auto mb-3 w-7 h-7 text-blue-300" />

                <h3 className="text-3xl font-black text-white">150+</h3>

                <p className="text-sm text-slate-400 mt-2">Specialists</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <ShieldCheck className="mx-auto mb-3 w-7 h-7 text-cyan-300" />

                <h3 className="text-3xl font-black text-white">100%</h3>

                <p className="text-sm text-slate-400 mt-2">Verified Doctors</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <Stethoscope className="mx-auto mb-3 w-7 h-7 text-blue-300" />

                <h3 className="text-3xl font-black text-white">24/7</h3>

                <p className="text-sm text-slate-400 mt-2">Healthcare</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Section Here */}
      {/* Departments Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
              <ShieldCheck size={16} />
              Medical Departments
            </span>

            <h2 className="mt-5 text-4xl font-extrabold text-slate-900">
              Browse Our Departments
            </h2>

            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              Every department is staffed by experienced specialists committed
              to providing high-quality healthcare services with compassion and
              professionalism.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-3xl border border-slate-200 bg-white p-8"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 mb-6" />
                  <div className="h-6 bg-slate-200 rounded w-2/3 mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-20">
              <Building2 size={70} className="mx-auto text-blue-500 mb-5" />

              <h3 className="text-2xl font-bold text-slate-800">
                No Departments Found
              </h3>

              <p className="mt-3 text-slate-500">
                Departments will appear here once they are added.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((department) => (
                <Link
                  key={department.id}
                  to={`/department-details/${department.id}`}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
                >
                  {/* Background Decoration */}

                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-50 blur-3xl opacity-0 transition group-hover:opacity-100"></div>

                  <div className="relative z-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg mb-6">
                      <Building2 size={30} />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {department.name}
                    </h3>

                    <p className="mt-4 text-slate-500 leading-7 line-clamp-4">
                      {department.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        View Department
                      </span>

                      <ArrowRight
                        size={20}
                        className="text-blue-600 transition-transform group-hover:translate-x-2"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* ================= WHY CHOOSE OUR DEPARTMENTS ================= */}

      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700">
              <ShieldCheck size={16} />
              Why Choose DoctorCare
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-900">
              Healthcare You Can
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Trust
              </span>
            </h2>

            <p className="mt-6 text-slate-500 text-lg leading-8">
              Every department is designed to deliver outstanding healthcare
              through experienced specialists, modern technology, and
              compassionate patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              {
                icon: Users,
                title: "Experienced Specialists",
                description:
                  "Highly qualified doctors with years of clinical experience.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted Healthcare",
                description:
                  "Safe, secure, and internationally aligned healthcare standards.",
              },
              {
                icon: Building2,
                title: "Modern Facilities",
                description:
                  "Advanced diagnostic equipment and state-of-the-art treatment rooms.",
              },
              {
                icon: Stethoscope,
                title: "Personalized Care",
                description:
                  "Treatment plans tailored specifically for every patient's needs.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white border border-slate-200 p-8 transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.25),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,.20),transparent_35%)]"></div>

        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
              <HeartPulse size={16} />
              Need Medical Assistance?
            </span>

            <h2 className="mt-8 text-5xl md:text-6xl font-black text-white leading-tight">
              Let's Help You Find
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                The Right Specialist
              </span>
            </h2>

            <p className="mt-8 text-lg text-slate-300 leading-8 max-w-3xl mx-auto">
              Browse our departments, choose your preferred specialist, and
              schedule your appointment in just a few clicks.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition hover:-translate-y-1"
              >
                Book Appointment
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/doctors"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                Browse Doctors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;
