import React, { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Users,
  Award,
  Stethoscope,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  loginUser,
  clearError,
  clearMessage,
} from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (message) {
      toast.success(message);

      const timer = setTimeout(() => {
        dispatch(clearMessage());
        navigate("/");
      }, 1000);

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
    dispatch(loginUser(formData));
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 py-10 px-4">
      {/* Floating Container */}

      <div className="grid w-full max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:min-h-[88vh] lg:grid-cols-2">
        {/* ===================================================== */}
        {/* LEFT SIDE */}
        {/* ===================================================== */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)]"></div>

          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10 flex w-full flex-col justify-between p-16">
            {/* Logo */}

            <div>
              <div className="mb-10 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                  <HeartPulse size={34} className="text-blue-700" />
                </div>

                <div>
                  <h1 className="text-3xl font-black text-white">DoctorCare</h1>

                  <p className="text-blue-100">Healthcare Management System</p>
                </div>
              </div>

              <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-cyan-200">
                Welcome Back
              </span>

              <h2 className="mt-8 max-w-xl text-5xl font-black leading-tight text-white">
                Your health,
                <br />
                always
                <span className="text-cyan-300"> connected.</span>
              </h2>

              <p className="mt-8 max-w-lg text-lg leading-8 text-blue-100">
                Sign in to manage appointments, access your medical history,
                communicate with specialists, and enjoy secure healthcare
                services wherever you are.
              </p>
            </div>

            {/* Statistics */}

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
                <Users className="mb-5 text-cyan-300" size={34} />
                <h3 className="text-4xl font-black text-white">15K+</h3>
                <p className="mt-2 text-blue-100">Happy Patients</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
                <Stethoscope className="mb-5 text-cyan-300" size={34} />
                <h3 className="text-4xl font-black text-white">150+</h3>
                <p className="mt-2 text-blue-100">Expert Doctors</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
                <Award className="mb-5 text-cyan-300" size={34} />
                <h3 className="text-4xl font-black text-white">30+</h3>
                <p className="mt-2 text-blue-100">Departments</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
                <ShieldCheck className="mb-5 text-cyan-300" size={34} />
                <h3 className="text-4xl font-black text-white">100%</h3>
                <p className="mt-2 text-blue-100">Secure Access</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* RIGHT SIDE STARTS IN PART 2 */}
        {/* ===================================================== */}
        <div className="flex items-center justify-center bg-slate-50 p-8 lg:p-14">
          <div className="w-full max-w-md">
            {/* Header */}

            <div className="mb-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-lg">
                <ShieldCheck size={34} className="text-white" />
              </div>

              <h2 className="text-4xl font-black text-slate-900">
                Welcome Back
              </h2>

              <p className="mt-3 text-slate-500 leading-7">
                Login to continue managing appointments, medical records and
                your healthcare services.
              </p>
            </div>

            {/* Login Form */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}

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
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
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
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-14 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember */}

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-blue-700 transition hover:text-cyan-600"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
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
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Divider */}

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-slate-50 px-4 text-sm text-slate-400">
                    OR
                  </span>
                </div>
              </div>
              {/* Create Account */}

              <div className="text-center">
                <p className="text-slate-600">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="ml-2 font-bold text-blue-700 transition hover:text-cyan-600"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* Security Notice */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <ShieldCheck size={24} className="text-blue-700" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800">Secure Login</h4>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      DoctorCare protects your account using encrypted
                      authentication, secure sessions and advanced security
                      technologies. Your medical records remain private,
                      protected and accessible only by authorized users.
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

export default Login;
