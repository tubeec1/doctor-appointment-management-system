import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Globe,
  Droplets,
  ShieldCheck,
  HeartPulse,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Stethoscope,
  Users,
  Award,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  registerUser,
  clearError,
  clearMessage,
} from "../../features/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    nationality: "",
    dateOfBirth: "",
    bloodGroup: "",
  });

  useEffect(() => {
    if (message) {
      toast.success(message);

      const timer = setTimeout(() => {
        dispatch(clearMessage());
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [message, error, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 py-10 px-5">
      <div className="grid w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-[1fr_0.9fr]">
        {/* ====================================================== */}
        {/* LEFT SIDE */}
        {/* ====================================================== */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_45%)]"></div>

          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10 flex h-full flex-col justify-between p-14">
            <div>
              <div className="mb-10 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl">
                  <HeartPulse size={34} className="text-blue-700" />
                </div>

                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white">
                    DoctorCare
                  </h1>

                  <p className="text-blue-100">Hospital Management System</p>
                </div>
              </div>

              <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-cyan-200">
                Welcome
              </span>

              <h2 className="mt-8 text-5xl font-black leading-tight text-white">
                Modern Healthcare
                <br />
                Starts With
                <span className="text-cyan-300"> You.</span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-blue-100">
                Join thousands of patients using DoctorCare to book
                appointments, manage medical records, connect with trusted
                specialists, and enjoy fast, secure healthcare services from
                anywhere.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                <Users size={34} className="mb-5 text-cyan-300" />

                <h3 className="text-4xl font-black text-white">15K+</h3>

                <p className="mt-2 text-blue-100">Registered Patients</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                <Stethoscope size={34} className="mb-5 text-cyan-300" />

                <h3 className="text-4xl font-black text-white">150+</h3>

                <p className="mt-2 text-blue-100">Specialist Doctors</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                <Award size={34} className="mb-5 text-cyan-300" />

                <h3 className="text-4xl font-black text-white">30+</h3>

                <p className="mt-2 text-blue-100">Departments</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                <ShieldCheck size={34} className="mb-5 text-cyan-300" />

                <h3 className="text-4xl font-black text-white">100%</h3>

                <p className="mt-2 text-blue-100">Secure Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* RIGHT SIDE */}
        {/* ====================================================== */}

        <div className="flex items-center justify-center px-10 py-14">
          <div className="mx-auto w-full max-w-2xl transition-all duration-500">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl">
                <User size={34} className="text-white" />
              </div>

              <h2 className="text-4xl font-black text-slate-900">
                Create Your Account
              </h2>

              <p className="mt-3 text-slate-500">
                Register today and access trusted healthcare services with
                DoctorCare.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name + Email */}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-14 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {/* Gender + Phone */}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="61XXXXXXXX"
                      className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Nationality + Blood Group */}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Nationality
                  </label>

                  <div className="relative">
                    <Globe
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="nationality"
                      required
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="Somali"
                      className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Blood Group
                  </label>

                  <div className="relative">
                    <Droplets
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                    />

                    <select
                      name="bloodGroup"
                      required
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date of Birth */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Date of Birth
                </label>

                <div className="relative">
                  <Calendar
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-300/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Divider */}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-slate-400">
                    OR
                  </span>
                </div>
              </div>

              {/* Login */}

              <div className="text-center">
                <p className="text-slate-600">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-2 font-bold text-blue-700 transition hover:text-cyan-600"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

              {/* Security Card */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-100 p-3">
                    <ShieldCheck size={24} className="text-blue-700" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Your information is protected
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      DoctorCare uses encrypted communication, secure
                      authentication, and protected cloud storage to keep your
                      personal information and medical records safe. Your data
                      is never shared without your permission.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
