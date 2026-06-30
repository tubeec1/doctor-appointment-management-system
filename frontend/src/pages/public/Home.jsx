import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  ArrowRight,
  LoaderCircle,
  CalendarDays,
  ShieldCheck,
  Stethoscope,
  Users,
  HeartPulse,
  CheckCircle2,
  Search,
  CreditCard,
  Star,
  BriefcaseMedical,
  Quote,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Plus,
  Minus,
  Zap,
  Clock,
  Award,
} from "lucide-react";
import { HiCurrencyDollar } from "react-icons/hi";
import {
  getDepartments,
  selectDepartments,
  selectDepartmentLoading,
  selectDepartmentError,
} from "../../features/departments/departmentSlice";
import {
  getDoctors,
  selectDoctors,
  selectDoctorLoading,
  selectDoctorError,
} from "../../features/doctors/doctorSlice";

/* ─── Global styles injected once ─── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  :root {
    --navy: #050c1a;
    --navy-2: #0d1b35;
    --blue: #2563eb;
    --blue-bright: #3b82f6;
    --cyan: #06b6d4;
    --cyan-light: #67e8f9;
    --white: #ffffff;
    --slate: #94a3b8;
    --slate-light: #cbd5e1;
  }

  .dc-page { font-family: 'Inter', system-ui, sans-serif; }

  /* ECG pulse line */
  @keyframes ecg-move { 0%{stroke-dashoffset:1200} 100%{stroke-dashoffset:0} }
  .ecg-path {
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    animation: ecg-move 3s ease-in-out infinite;
  }

  /* Glow orbs */
  @keyframes orb-pulse {
    0%,100%{ transform:scale(1); opacity:.5 }
    50%{ transform:scale(1.15); opacity:.8 }
  }
  .orb { animation: orb-pulse 6s ease-in-out infinite; }
  .orb-2 { animation: orb-pulse 8s ease-in-out infinite 2s; }

  /* Floating cards */
  @keyframes float-up {
    0%,100%{ transform:translateY(0px) }
    50%{ transform:translateY(-12px) }
  }
  .float-a { animation: float-up 4s ease-in-out infinite; }
  .float-b { animation: float-up 5s ease-in-out infinite 1.5s; }

  /* Stat counter reveal */
  @keyframes slide-up {
    from{ opacity:0; transform:translateY(24px) }
    to{ opacity:1; transform:translateY(0) }
  }
  .slide-up { animation: slide-up .6s ease both; }

  /* Shimmer skeleton */
  @keyframes shimmer { 100%{ transform:translateX(200%) } }
  .shimmer-card {
    position:relative; overflow:hidden; background:#1a2744; border-radius:20px; height:220px;
  }
  .shimmer-card::after {
    content:''; position:absolute; inset:0; transform:translateX(-100%);
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.05),transparent);
    animation: shimmer 1.6s infinite;
  }

  /* FAQ answer reveal */
  @keyframes faq-open {
    from{ opacity:0; max-height:0; transform:translateY(-6px) }
    to{ opacity:1; max-height:200px; transform:translateY(0) }
  }
  .faq-answer-animate {
    animation: faq-open .28s ease both;
    overflow: hidden;
  }

  /* Card hover glow */
  .dc-card-dark {
    background: linear-gradient(145deg, #0f1f40, #0d1b35);
    border: 1px solid rgba(37,99,235,.18);
    border-radius: 20px;
    transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
  }
  .dc-card-dark:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(37,99,235,.25);
    border-color: rgba(37,99,235,.5);
  }

  .dc-card-light {
    background: #ffffff;
    border: 1px solid #e8f0fe;
    border-radius: 20px;
    transition: transform .3s ease, box-shadow .3s ease;
  }
  .dc-card-light:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(37,99,235,.12);
  }

  /* Gradient text */
  .grad-text {
    background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Primary button */
  .dc-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 15px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff; text-decoration: none;
    box-shadow: 0 8px 24px rgba(37,99,235,.4);
    transition: transform .25s, box-shadow .25s;
  }
  .dc-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(37,99,235,.5); }

  /* Ghost button */
  .dc-btn-ghost {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 15px;
    border: 2px solid rgba(255,255,255,.2); color: #fff; text-decoration: none;
    backdrop-filter: blur(8px);
    transition: background .25s, border-color .25s;
  }
  .dc-btn-ghost:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.4); }

  /* Pill badge */
  .dc-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 999px;
    background: rgba(37,99,235,.15); border: 1px solid rgba(37,99,235,.3);
    color: #60a5fa; font-size: 13px; font-weight: 600; letter-spacing: .04em;
  }
  .dc-pill-dark {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 999px;
    background: #eff6ff; border: 1px solid #bfdbfe;
    color: #2563eb; font-size: 13px; font-weight: 600;
  }

  /* Testimonial dots */
  .t-dot {
    height: 8px; border-radius: 4px;
    background: rgba(255,255,255,.2);
    transition: all .3s ease; cursor: pointer;
  }
  .t-dot.active { width: 28px !important; background: #2563eb; }
  .t-dot.inactive { width: 8px !important; }
  .t-dot.inactive:hover { background: rgba(255,255,255,.4); }

  /* Step connector line */
  .step-line {
    position: absolute; top: 40px; left: calc(50% + 40px);
    width: calc(100% - 80px); height: 2px;
    background: linear-gradient(90deg, #2563eb, #06b6d4);
    opacity: .3;
  }
`;

/* ─── ECG Hero SVG ─── */
const EcgLine = () => (
  <svg
    viewBox="0 0 1200 120"
    preserveAspectRatio="none"
    className="absolute bottom-0 left-0 w-full"
    style={{ height: "120px", opacity: 0.15 }}
  >
    <path
      className="ecg-path"
      d="M0,60 L200,60 L220,60 L235,10 L250,110 L265,60 L285,60 L300,60
         L500,60 L520,60 L535,10 L550,110 L565,60 L585,60 L600,60
         L800,60 L820,60 L835,10 L850,110 L865,60 L885,60 L900,60
         L1100,60 L1120,60 L1135,10 L1150,110 L1165,60 L1185,60 L1200,60"
      fill="none"
      stroke="#06b6d4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Section wrapper helpers ─── */
const DarkSection = ({ children, className = "" }) => (
  <section
    className={`bg-[#050c1a] py-28 px-6 relative overflow-hidden ${className}`}
  >
    {children}
  </section>
);
const LightSection = ({ children, className = "" }) => (
  <section
    className={`bg-white py-28 px-6 relative overflow-hidden ${className}`}
  >
    {children}
  </section>
);

/* ─── Section heading variants ─── */
const DarkHeading = ({ pill, pillIcon, title, highlight, desc }) => (
  <div className="text-center max-w-2xl mx-auto mb-16">
    <div className="flex justify-center mb-5">
      <span className="dc-pill">
        {pillIcon}
        {pill}
      </span>
    </div>
    <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5 tracking-tight">
      {title} <span className="grad-text">{highlight}</span>
    </h2>
    {desc && <p className="text-[#94a3b8] text-lg leading-relaxed">{desc}</p>}
  </div>
);

const LightHeading = ({ pill, pillIcon, title, highlight, desc }) => (
  <div className="text-center max-w-2xl mx-auto mb-16">
    <div className="flex justify-center mb-5">
      <span className="dc-pill-dark">
        {pillIcon}
        {pill}
      </span>
    </div>
    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-5 tracking-tight">
      {title}{" "}
      <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        {highlight}
      </span>
    </h2>
    {desc && <p className="text-slate-500 text-lg leading-relaxed">{desc}</p>}
  </div>
);

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
const Home = () => {
  const dispatch = useDispatch();
  const departments = useSelector(selectDepartments);
  const loadingDepts = useSelector(selectDepartmentLoading);
  const deptError = useSelector(selectDepartmentError);
  const doctors = useSelector(selectDoctors);
  const loading = useSelector(selectDoctorLoading);
  const error = useSelector(selectDoctorError);

  const [search, setSearch] = useState("");

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Patient",
      rating: 5,
      comment:
        "DoctorCare made booking my appointment incredibly easy. The doctor was professional and I received excellent care.",
    },
    {
      id: 2,
      name: "Fatima Ali",
      role: "Patient",
      rating: 5,
      comment:
        "I loved how simple the system is. Everything from booking to payment was smooth and fast.",
    },
    {
      id: 3,
      name: "Mohamed Noor",
      role: "Patient",
      rating: 5,
      comment:
        "Highly recommended. The appointment reminders and medical records helped me manage my treatment better.",
    },
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Simply choose your preferred doctor, select an available date and time, then confirm your appointment online.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        "Yes. You can cancel or reschedule your appointment directly from your patient dashboard before the appointment time.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "Yes. Creating an account allows you to book appointments, access medical records, make payments, and receive appointment reminders.",
    },
    {
      question: "Can I access my medical records online?",
      answer:
        "Absolutely. Your medical records are securely stored and can be viewed anytime through your patient dashboard.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes. DoctorCare uses secure authentication and encrypted communication to protect your personal and medical information.",
    },
  ];

  const [tIdx, setTIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const nextT = () => setTIdx((p) => (p + 1) % testimonials.length);
  const prevT = () =>
    setTIdx((p) => (p === 0 ? testimonials.length - 1 : p - 1));

  useEffect(() => {
    const iv = setInterval(nextT, 5000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    dispatch(getDepartments());
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
    <div className="dc-page">
      <style>{GLOBAL_STYLES}</style>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,#050c1a 0%,#0a1628 50%,#061020 100%)",
        }}
      >
        {/* Glow orbs */}
        <div
          className="orb absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)",
          }}
        />
        <div
          className="orb-2 absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(6,182,212,.15) 0%,transparent 70%)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="dc-pill mb-8" style={{ width: "fit-content" }}>
                <HeartPulse size={14} className="text-cyan-400" />
                <span style={{ color: "#67e8f9" }}>
                  Trusted Healthcare Platform
                </span>
              </div>

              <h1
                className="font-black text-white leading-[1.05] tracking-tight mb-7"
                style={{ fontSize: "clamp(42px,5.5vw,72px)" }}
              >
                Your Health,
                <br />
                <span className="grad-text">Our Priority.</span>
                <br />
                <span
                  style={{
                    color: "rgba(255,255,255,.6)",
                    fontWeight: 700,
                    fontSize: "65%",
                  }}
                >
                  Book a specialist in seconds.
                </span>
              </h1>

              <p className="text-[#94a3b8] text-lg leading-relaxed mb-10 max-w-lg">
                Connect with verified doctors across every specialty. Schedule,
                manage records, and receive care — all in one secure platform.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/doctors" className="dc-btn-primary">
                  Find a Doctor <ArrowRight size={18} />
                </Link>
                <Link to="/departments" className="dc-btn-ghost">
                  Browse Departments
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  "Verified Specialists",
                  "Secure Medical Records",
                  "Instant Confirmation",
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: "#94a3b8" }}
                  >
                    <CheckCircle2 size={15} className="text-cyan-400" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — glassmorphism panel */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[420px]">
                {/* Main glass card */}
                <div
                  className="rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.02))",
                    border: "1px solid rgba(255,255,255,.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 40px 80px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)",
                  }}
                >
                  {/* inner pulse ring */}
                  <div className="orb absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-64 h-64 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle,rgba(6,182,212,.15),transparent 70%)",
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex flex-col items-center py-8">
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
                      style={{
                        background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                        boxShadow: "0 0 60px rgba(37,99,235,.6)",
                      }}
                    >
                      <Stethoscope className="text-white" size={52} />
                    </div>
                    <p className="text-white font-bold text-xl mb-1">
                      DoctorCare
                    </p>
                    <p style={{ color: "#94a3b8", fontSize: "13px" }}>
                      Healthcare Platform
                    </p>

                    <div className="w-full mt-8 grid grid-cols-3 gap-3 text-center">
                      {[
                        ["150+", "Doctors"],
                        ["30+", "Depts"],
                        ["15K+", "Patients"],
                      ].map(([v, l]) => (
                        <div
                          key={l}
                          className="rounded-xl py-4 px-2"
                          style={{
                            background: "rgba(255,255,255,.05)",
                            border: "1px solid rgba(255,255,255,.07)",
                          }}
                        >
                          <p className="text-white font-black text-xl leading-tight">
                            {v}
                          </p>
                          <p
                            style={{
                              color: "#94a3b8",
                              fontSize: "11px",
                              marginTop: "2px",
                            }}
                          >
                            {l}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating pill — top left */}
                <div
                  className="float-a absolute -left-8 top-8 rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.12)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,.3)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    }}
                  >
                    <CalendarDays size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      Online Booking
                    </p>
                    <p style={{ color: "#94a3b8", fontSize: "11px" }}>
                      Book in seconds
                    </p>
                  </div>
                </div>

                {/* Floating pill — bottom right */}
                <div
                  className="float-b absolute -right-8 bottom-16 rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.12)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,.3)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#06b6d4,#0891b2)",
                    }}
                  >
                    <ShieldCheck size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">100% Secure</p>
                    <p style={{ color: "#94a3b8", fontSize: "11px" }}>
                      Data protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ECG line */}
        <EcgLine />

        {/* Stats strip */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-6"
          style={{ marginTop: "-2px", paddingBottom: "0" }}
        >
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{
              background: "rgba(255,255,255,.06)",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            {[
              {
                icon: <Users size={20} />,
                val: "150+",
                label: "Verified Doctors",
              },
              {
                icon: <Building2 size={20} />,
                val: "30+",
                label: "Departments",
              },
              {
                icon: <HeartPulse size={20} />,
                val: "15K+",
                label: "Happy Patients",
              },
              {
                icon: <Clock size={20} />,
                val: "24/7",
                label: "Support Available",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-8 gap-2"
                style={{ background: "rgba(5,12,26,.6)" }}
              >
                <div style={{ color: "#06b6d4" }}>{s.icon}</div>
                <p className="text-white font-black text-3xl">{s.val}</p>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "80px" }} />
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════ */}
      <LightSection>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT — stacked accent cards */}
          <div className="relative" style={{ minHeight: "520px" }}>
            {/* Back card */}
            <div
              className="absolute top-8 left-8 right-0 bottom-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg,#dbeafe,#e0f2fe)",
                border: "1px solid #bfdbfe",
              }}
            />
            {/* Main card */}
            <div
              className="relative rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                height: "440px",
                background: "linear-gradient(135deg,#1e40af,#0891b2)",
                boxShadow: "0 40px 80px rgba(37,99,235,.25)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <HeartPulse
                className="text-white relative z-10"
                style={{ width: "140px", height: "140px" }}
              />
              {/* bottom strip */}
              <div
                className="absolute bottom-0 left-0 right-0 px-8 py-6"
                style={{
                  background: "rgba(0,0,0,.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p className="text-white font-bold text-lg">
                  Committed to Your Wellness
                </p>
                <p style={{ color: "rgba(255,255,255,.6)", fontSize: "13px" }}>
                  Quality care, every appointment
                </p>
              </div>
            </div>
            {/* Stat chips */}
            <div
              className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white rounded-2xl px-6 py-5 shadow-2xl shadow-blue-100"
              style={{ border: "1px solid #e0f2fe" }}
            >
              <p className="font-black text-4xl" style={{ color: "#2563eb" }}>
                10+
              </p>
              <p
                style={{ color: "#94a3b8", fontSize: "13px", marginTop: "2px" }}
              >
                Years of Excellence
              </p>
            </div>
            <div
              className="absolute -right-5 bottom-24 bg-white rounded-2xl px-6 py-5 shadow-2xl shadow-blue-100"
              style={{ border: "1px solid #e0f2fe" }}
            >
              <p className="font-black text-4xl" style={{ color: "#06b6d4" }}>
                24/7
              </p>
              <p
                style={{ color: "#94a3b8", fontSize: "13px", marginTop: "2px" }}
              >
                Patient Support
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="dc-pill-dark mb-6" style={{ width: "fit-content" }}>
              <ShieldCheck size={14} /> About DoctorCare
            </div>
            <h2
              className="font-black text-slate-900 leading-tight tracking-tight mb-6"
              style={{ fontSize: "clamp(32px,4vw,52px)" }}
            >
              Your Trusted Partner
              <br />
              For Better{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Healthcare
              </span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              DoctorCare is a modern healthcare management platform created to
              simplify the way patients connect with doctors. Our mission is to
              provide secure, fast, and reliable appointment booking while
              helping healthcare professionals deliver excellent medical
              services.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                {
                  icon: <Users size={18} />,
                  t: "Experienced Doctors",
                  d: "Certified specialists from multiple medical departments.",
                },
                {
                  icon: <CalendarDays size={18} />,
                  t: "Easy Booking",
                  d: "Schedule appointments within seconds anytime.",
                },
                {
                  icon: <ShieldCheck size={18} />,
                  t: "Secure Records",
                  d: "Your medical information stays protected and private.",
                },
                {
                  icon: <HeartPulse size={18} />,
                  t: "Patient First",
                  d: "We focus on delivering quality healthcare experiences.",
                },
              ].map((f) => (
                <div key={f.t} className="dc-card-light p-5 flex gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-1">
                      {f.t}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {f.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="dc-btn-primary"
              style={{ width: "fit-content" }}
            >
              Learn More <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </LightSection>

      {/* ══ DEPARTMENTS ══════════════════════════════════════ */}
      <DarkSection>
        {/* subtle top border glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(37,99,235,.5),transparent)",
          }}
        />
        <div
          className="orb-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(37,99,235,.07) 0%,transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <DarkHeading
            pill="Our Departments"
            pillIcon={<Building2 size={14} />}
            title="Explore Our Medical"
            highlight="Departments"
            desc="Specialized care across every discipline, staffed by experienced professionals dedicated to exceptional outcomes."
          />

          {loadingDepts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="shimmer-card" />
              ))}
            </div>
          )}
          {!loadingDepts && deptError && (
            <p
              className="text-center py-16 font-semibold"
              style={{ color: "#f87171" }}
            >
              Failed to load departments.
            </p>
          )}
          {!loadingDepts && !deptError && departments?.length === 0 && (
            <p className="text-center py-16" style={{ color: "#64748b" }}>
              No departments available.
            </p>
          )}
          {!loadingDepts && !deptError && departments?.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.slice(0, 6).map((dept) => (
                  <div key={dept.id} className="dc-card-dark p-8 flex flex-col">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background:
                          "linear-gradient(135deg,rgba(37,99,235,.25),rgba(6,182,212,.2))",
                        border: "1px solid rgba(37,99,235,.3)",
                      }}
                    >
                      <Building2 size={26} style={{ color: "#60a5fa" }} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-3">
                      {dept.department_name}
                    </h3>
                    <p
                      className="flex-1 mb-6 text-sm leading-relaxed"
                      style={{ color: "#64748b" }}
                    >
                      {dept.description}
                    </p>
                    <Link
                      to={`/department-details/${dept.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold group"
                      style={{ color: "#60a5fa" }}
                    >
                      View Department
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-14">
                <Link to="/departments" className="dc-btn-primary">
                  View All Departments <ArrowRight size={18} />
                </Link>
              </div>
            </>
          )}
        </div>
      </DarkSection>

      {/* ══ DOCTORS ══════════════════════════════════════════ */}
      {/* ================= Doctors Section ================= */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold tracking-wide text-blue-700">
              Our Doctors
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Meet Our Medical Specialists
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-500">
              Our experienced physicians provide compassionate, personalized
              care across a wide range of medical specialties. Whether you need
              a routine consultation or specialized treatment, our dedicated
              team is committed to helping you achieve the best possible health
              outcomes.
            </p>
          </div>
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
      {/* ══ HOW IT WORKS ══════════════════════════════════ */}
      <DarkSection>
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(6,182,212,.4),transparent)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <DarkHeading
            pill="Appointment Process"
            pillIcon={<CalendarDays size={14} />}
            title="Book Yours in"
            highlight="Four Steps"
            desc="Simple, secure, and convenient. From finding a specialist to receiving care — we've made it effortless."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                icon: <Search size={28} />,
                t: "Find a Doctor",
                d: "Browse by department and find the specialist that fits your needs.",
              },
              {
                n: "02",
                icon: <CalendarDays size={28} />,
                t: "Pick a Time",
                d: "Choose an available slot from the doctor's live calendar.",
              },
              {
                n: "03",
                icon: <CreditCard size={28} />,
                t: "Confirm Booking",
                d: "Complete booking securely and get instant confirmation.",
              },
              {
                n: "04",
                icon: <HeartPulse size={28} />,
                t: "Receive Care",
                d: "Attend your appointment and receive professional healthcare.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="dc-card-dark p-8 relative overflow-hidden flex flex-col items-center text-center"
              >
                {/* Ghost step number */}
                <span
                  className="absolute -top-3 -right-1 font-black select-none pointer-events-none"
                  style={{
                    fontSize: "88px",
                    color: "rgba(37,99,235,.07)",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </span>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                    boxShadow: "0 12px 30px rgba(37,99,235,.4)",
                  }}
                >
                  <span style={{ color: "white" }}>{s.icon}</span>
                </div>
                <p className="font-bold text-white text-lg mb-3 relative z-10">
                  {s.t}
                </p>
                <p
                  className="text-sm leading-relaxed relative z-10"
                  style={{ color: "#64748b" }}
                >
                  {s.d}
                </p>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div
            className="mt-14 rounded-2xl overflow-hidden relative"
            style={{
              background:
                "linear-gradient(135deg,rgba(37,99,235,.2),rgba(6,182,212,.15))",
              border: "1px solid rgba(37,99,235,.25)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-10">
              <div>
                <p className="text-white font-black text-2xl mb-2">
                  Ready to book your appointment?
                </p>
                <p style={{ color: "#94a3b8" }}>
                  Our specialists are available now — get the care you deserve.
                </p>
              </div>
              <Link to="/doctors" className="dc-btn-primary whitespace-nowrap">
                Book Appointment <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </DarkSection>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <LightSection>
        <div className="max-w-4xl mx-auto">
          <LightHeading
            pill="Patient Stories"
            pillIcon={<Quote size={14} />}
            title="What Our"
            highlight="Patients Say"
            desc="Real stories from real patients who trust DoctorCare for their healthcare needs."
          />

          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#0f172a,#1e2d4e)",
              border: "1px solid rgba(37,99,235,.2)",
              boxShadow: "0 40px 80px rgba(15,23,42,.15)",
            }}
          >
            {/* decorative glow */}
            <div
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle,rgba(37,99,235,.2),transparent 70%)",
              }}
            />
            {/* dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 p-12 md:p-16">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                }}
              >
                <Quote size={26} className="text-white" />
              </div>
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[tIdx].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p
                className="text-xl md:text-2xl font-medium leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,.85)" }}
              >
                "{testimonials[tIdx].comment}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-13 h-13 rounded-full flex items-center justify-center text-xl font-black text-white"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                    }}
                  >
                    {testimonials[tIdx].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {testimonials[tIdx].name}
                    </p>
                    <p style={{ color: "#64748b", fontSize: "13px" }}>
                      {testimonials[tIdx].role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevT}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(37,99,235,.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.06)";
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextT}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(37,99,235,.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.06)";
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              {/* Dots */}
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTIdx(i)}
                    className={`t-dot ${i === tIdx ? "active" : "inactive"}`}
                    style={{ width: i === tIdx ? "28px" : "8px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </LightSection>

      {/* ══ FAQ ══════════════════════════════════════════════ */}
      <DarkSection>
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(37,99,235,.5),transparent)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <DarkHeading
            pill="FAQ"
            pillIcon={<HelpCircle size={14} />}
            title="Common"
            highlight="Questions"
            desc="Everything you need to know about appointments, records, and your DoctorCare account."
          />
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden"
                style={{
                  background:
                    openFaq === idx
                      ? "linear-gradient(145deg,rgba(37,99,235,.12),rgba(6,182,212,.06))"
                      : "rgba(255,255,255,.03)",
                  border: `1px solid ${openFaq === idx ? "rgba(37,99,235,.35)" : "rgba(255,255,255,.07)"}`,
                  transition: "background .25s, border-color .25s",
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <span className="font-bold text-white text-base pr-4">
                    {faq.question}
                  </span>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background:
                        openFaq === idx
                          ? "linear-gradient(135deg,#2563eb,#06b6d4)"
                          : "rgba(255,255,255,.06)",
                      color: "white",
                    }}
                  >
                    {openFaq === idx ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                {openFaq === idx && (
                  <div
                    className="faq-answer-animate px-7 pb-6 text-sm leading-relaxed"
                    style={{ color: "#94a3b8" }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DarkSection>
    </div>
  );
};

export default Home;
