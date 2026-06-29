import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  HeartPulse,
  CalendarDays,
  Star,
  Zap,
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  Globe,
  Lock,
} from "lucide-react";

/* ─── Injected styles (scoped to .dc-about) ─────────────────── */
const ABOUT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .dc-about * { box-sizing: border-box; }
  .dc-about { font-family: 'Inter', system-ui, sans-serif; background: #ffffff; }

  /* ── Keyframes ── */
  @keyframes dc-fade-up {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dc-pulse-ring {
    0%, 100% { transform: scale(1); opacity: .5; }
    50%       { transform: scale(1.08); opacity: .9; }
  }
  @keyframes dc-line-grow {
    from { width: 0; }
    to   { width: 64px; }
  }
  @keyframes dc-counter-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes dc-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  /* ── Section eyebrow ── */
  .dc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #2563eb;
    padding: 6px 14px;
    border-radius: 999px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    margin-bottom: 20px;
  }
  .dc-eyebrow-dark {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #67e8f9;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(6,182,212,.1);
    border: 1px solid rgba(6,182,212,.25);
    margin-bottom: 20px;
  }

  /* ── Display heading ── */
  .dc-display {
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -.03em;
    color: #0f172a;
  }
  .dc-display-dark {
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -.03em;
    color: #ffffff;
  }
  .dc-grad {
    background: linear-gradient(120deg, #3b82f6 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .dc-grad-warm {
    background: linear-gradient(120deg, #60a5fa 0%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Accent underline ── */
  .dc-underline-accent {
    position: relative;
    display: inline-block;
  }
  .dc-underline-accent::after {
    content: '';
    position: absolute;
    bottom: -6px; left: 0;
    height: 4px; width: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, #2563eb, #06b6d4);
    animation: dc-line-grow .8s ease both;
  }

  /* ── Stat number card ── */
  .dc-stat-chip {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 4px 24px rgba(37,99,235,.06);
    transition: transform .25s, box-shadow .25s;
  }
  .dc-stat-chip:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(37,99,235,.12);
  }

  /* ── Feature row card ── */
  .dc-feat-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    border-radius: 16px;
    border: 1px solid #f1f5f9;
    background: #ffffff;
    transition: border-color .25s, box-shadow .25s;
  }
  .dc-feat-row:hover {
    border-color: #bfdbfe;
    box-shadow: 0 8px 32px rgba(37,99,235,.08);
  }

  /* ── Timeline item ── */
  .dc-timeline-item {
    position: relative;
    padding-left: 52px;
    padding-bottom: 40px;
  }
  .dc-timeline-item:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 19px; top: 40px;
    width: 2px;
    bottom: 0;
    background: linear-gradient(180deg, #2563eb22, transparent);
  }
  .dc-timeline-dot {
    position: absolute;
    left: 0; top: 4px;
    width: 40px; height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #06b6d4);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 0 6px #eff6ff;
    color: #fff;
  }

  /* ── Value card (dark section) ── */
  .dc-value-card {
    background: linear-gradient(145deg, #0f1f40, #0d1b35);
    border: 1px solid rgba(37,99,235,.18);
    border-radius: 20px;
    padding: 36px 32px;
    transition: transform .3s, box-shadow .3s, border-color .3s;
  }
  .dc-value-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(37,99,235,.22);
    border-color: rgba(37,99,235,.45);
  }

  /* ── CTA section ── */
  .dc-cta-band {
    background: linear-gradient(135deg, #0f1f40, #0d2654);
    border-radius: 28px;
    overflow: hidden;
    position: relative;
  }
  .dc-cta-band::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E") repeat;
  }

  /* ── Trusted logos strip ── */
  .dc-logo-strip {
    display: flex; align-items: center; gap: 32px; flex-wrap: wrap;
    opacity: .45;
    filter: grayscale(1);
  }

  /* ── Pulse orb ── */
  .dc-orb { animation: dc-pulse-ring 6s ease-in-out infinite; }
  .dc-orb-b { animation: dc-pulse-ring 8s ease-in-out infinite 2s; }

  /* ── Primary button ── */
  .dc-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 30px; border-radius: 12px;
    font-weight: 700; font-size: 15px; text-decoration: none;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    box-shadow: 0 8px 28px rgba(37,99,235,.38);
    transition: transform .25s, box-shadow .25s;
    border: none; cursor: pointer;
  }
  .dc-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(37,99,235,.5); }

  .dc-btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 30px; border-radius: 12px;
    font-weight: 700; font-size: 15px; text-decoration: none;
    background: transparent;
    color: #2563eb;
    border: 2px solid #bfdbfe;
    transition: border-color .25s, background .25s;
    cursor: pointer;
  }
  .dc-btn-outline:hover { border-color: #2563eb; background: #eff6ff; }

  /* ── Quote card ── */
  .dc-quote {
    background: linear-gradient(135deg, #eff6ff, #ecfeff);
    border: 1px solid #bfdbfe;
    border-radius: 20px;
    padding: 32px;
    position: relative;
  }
  .dc-quote::before {
    content: '"';
    position: absolute; top: -10px; left: 24px;
    font-size: 80px; font-weight: 900; line-height: 1;
    color: #2563eb; opacity: .15;
  }
`;

/* ─── ABOUT PAGE ──────────────────────────────────────────────── */
const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const values = [
    {
      icon: <HeartPulse size={26} />,
      title: "Patient First",
      desc: "Every decision we make centers on the patient experience. From booking to aftercare, your wellbeing drives our product.",
    },
    {
      icon: <Lock size={26} />,
      title: "Privacy by Design",
      desc: "Medical data is intimate. We encrypt it end-to-end and never monetize your records — full stop.",
    },
    {
      icon: <TrendingUp size={26} />,
      title: "Continuous Improvement",
      desc: "We ship updates weekly based on patient feedback. The platform you use today is better than last month's — and next month's will be better still.",
    },
    {
      icon: <Globe size={26} />,
      title: "Accessible Care",
      desc: "Quality healthcare should not depend on geography or income. We work to lower every barrier that stands between patients and great doctors.",
    },
  ];

  const milestones = [
    {
      year: "2014",
      title: "Founded in Mogadishu",
      desc: "A small team of doctors and engineers set out to digitize appointment booking for three local clinics.",
    },
    {
      year: "2017",
      title: "Reached 50 Departments",
      desc: "Expanded to cover all major medical specialties with 50 departments and 80 verified specialists.",
    },
    {
      year: "2020",
      title: "10,000 Patients Served",
      desc: "Launched secure digital medical records and crossed the 10,000-patient milestone.",
    },
    {
      year: "2024",
      title: "24/7 Support & AI Triage",
      desc: "Introduced round-the-clock support and AI-assisted symptom triage to help patients find the right specialist faster.",
    },
  ];

  const team = [
    {
      name: "Dr. Omar Hassan",
      role: "Chief Medical Officer",
      spec: "Cardiology",
      init: "OH",
    },
    {
      name: "Amina Warsame",
      role: "Head of Engineering",
      spec: "Platform & Security",
      init: "AW",
    },
    {
      name: "Dr. Layla Farah",
      role: "Patient Experience Lead",
      spec: "Internal Medicine",
      init: "LF",
    },
  ];

  return (
    <div className="dc-about">
      <style>{ABOUT_STYLES}</style>

      {/* ══════════ HERO ══════════════════════════════════════════ */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #050c1a 0%, #0a1628 55%, #061020 100%)",
          padding: "120px 24px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orbs */}
        <div
          className="dc-orb"
          style={{
            position: "absolute",
            top: "-120px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="dc-orb-b"
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,.14) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.055) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "32px",
            }}
          >
            <span className="dc-eyebrow-dark">
              <ShieldCheck size={13} /> Our Story
            </span>
          </div>

          {/* Headline */}
          <h1
            className="dc-display-dark"
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Healthcare built on{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #60a5fa 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              trust.
            </span>
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "18px",
              lineHeight: "1.75",
              maxWidth: "640px",
              margin: "0 auto 56px",
            }}
          >
            DoctorCare started with a single belief: connecting patients to the
            right doctor should be fast, private, and genuinely simple. Ten
            years later, that belief still shapes every line of code we write.
          </p>

          {/* Stat row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                val: "150+",
                label: "Verified doctors",
                icon: <Users size={18} />,
              },
              { val: "30+", label: "Departments", icon: <Award size={18} /> },
              {
                val: "15K+",
                label: "Patients served",
                icon: <HeartPulse size={18} />,
              },
              {
                val: "10+",
                label: "Years operating",
                icon: <Clock size={18} />,
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,.045)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "18px",
                  padding: "28px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#06b6d4",
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {s.icon}
                </div>
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: "32px",
                    lineHeight: 1,
                    margin: "0 0 4px",
                  }}
                >
                  {s.val}
                </p>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MISSION ════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: "120px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* LEFT: visual column */}
            <div style={{ position: "relative" }}>
              {/* Background card */}
              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  right: "-24px",
                  bottom: "-24px",
                  background: "linear-gradient(135deg, #dbeafe, #cffafe)",
                  borderRadius: "28px",
                  border: "1px solid #bfdbfe",
                }}
              />
              {/* Main card */}
              <div
                style={{
                  position: "relative",
                  background: "linear-gradient(145deg, #1e3a8a, #0e7490)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  padding: "52px 40px",
                  boxShadow: "0 40px 80px rgba(30,58,138,.3)",
                }}
              >
                {/* dot grid */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Icon ring */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "32px",
                    }}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,.12)",
                        border: "2px solid rgba(255,255,255,.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 60px rgba(6,182,212,.4)",
                      }}
                    >
                      <HeartPulse size={48} color="#67e8f9" />
                    </div>
                  </div>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "22px",
                      textAlign: "center",
                      margin: "0 0 10px",
                    }}
                  >
                    Our mission
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,.65)",
                      fontSize: "15px",
                      textAlign: "center",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    Make specialist care accessible to every patient —
                    regardless of where they live or what they earn.
                  </p>
                </div>
              </div>

              {/* Floating stat chips */}
              <div
                className="dc-stat-chip"
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: "140px",
                  zIndex: 3,
                }}
              >
                <p
                  style={{
                    color: "#2563eb",
                    fontWeight: 900,
                    fontSize: "32px",
                    margin: "0 0 2px",
                  }}
                >
                  10+
                </p>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Years of excellence
                </p>
              </div>
              <div
                className="dc-stat-chip"
                style={{
                  position: "absolute",
                  right: "-32px",
                  bottom: "40px",
                  minWidth: "140px",
                  zIndex: 3,
                }}
              >
                <p
                  style={{
                    color: "#06b6d4",
                    fontWeight: 900,
                    fontSize: "32px",
                    margin: "0 0 2px",
                  }}
                >
                  24/7
                </p>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Patient support
                </p>
              </div>
            </div>

            {/* RIGHT: copy */}
            <div>
              <span className="dc-eyebrow">
                <ShieldCheck size={12} /> Who we are
              </span>
              <h2 className="dc-display" style={{ marginBottom: "20px" }}>
                Your partner in{" "}
                <span className="dc-grad dc-underline-accent">better care</span>
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "17px",
                  lineHeight: 1.8,
                  marginBottom: "36px",
                }}
              >
                DoctorCare is a modern healthcare management platform created to
                simplify the way patients connect with doctors. We handle the
                logistics — booking, records, reminders — so that every
                appointment starts with clarity and ends with confidence.
              </p>

              {/* Feature list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "40px",
                }}
              >
                {[
                  {
                    icon: <Users size={17} />,
                    title: "Experienced specialists",
                    desc: "Board-certified doctors across every major discipline.",
                  },
                  {
                    icon: <CalendarDays size={17} />,
                    title: "Instant booking",
                    desc: "Schedule an appointment from any device in under 60 seconds.",
                  },
                  {
                    icon: <Lock size={17} />,
                    title: "Encrypted records",
                    desc: "Your data is yours — secured and never shared without consent.",
                  },
                  {
                    icon: <Zap size={17} />,
                    title: "Real-time confirmations",
                    desc: "Receive booking confirmations and reminders the moment they're set.",
                  },
                ].map((f) => (
                  <div key={f.title} className="dc-feat-row">
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        flexShrink: 0,
                        background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: 700,
                          color: "#0f172a",
                          fontSize: "14px",
                          margin: "0 0 3px",
                        }}
                      >
                        {f.title}
                      </p>
                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/doctors" className="dc-btn">
                Find a doctor <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ VALUES ═════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(160deg, #050c1a 0%, #0a1628 100%)",
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* top divider glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(37,99,235,.5), transparent)",
            pointerEvents: "none",
          }}
        />
        {/* center orb */}
        <div
          className="dc-orb"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <span className="dc-eyebrow-dark">
              <Star size={12} /> What drives us
            </span>
            <h2 className="dc-display-dark" style={{ marginBottom: "16px" }}>
              The values behind{" "}
              <span
                style={{
                  background: "linear-gradient(120deg, #60a5fa, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                every decision
              </span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "17px",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Great software reflects the ethics of the people who build it.
              These four principles are non-negotiable at DoctorCare.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {values.map((v, i) => (
              <div key={v.title} className="dc-value-card">
                {/* Ghost number */}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "20px",
                    fontSize: "72px",
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "rgba(37,99,235,.06)",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,.3), rgba(6,182,212,.2))",
                    border: "1px solid rgba(37,99,235,.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#60a5fa",
                    marginBottom: "24px",
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  style={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "18px",
                    marginBottom: "12px",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TIMELINE ═══════════════════════════════════════ */}
      <section style={{ background: "#f8fafc", padding: "120px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <span className="dc-eyebrow">
              <TrendingUp size={12} /> Our journey
            </span>
            <h2 className="dc-display" style={{ marginBottom: "16px" }}>
              How we got <span className="dc-grad">here</span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "17px",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              A decade of building, listening, and iterating — milestone by
              milestone.
            </p>
          </div>

          <div>
            {milestones.map((m, i) => (
              <div key={m.year} className="dc-timeline-item">
                <div className="dc-timeline-dot">
                  <CheckCircle2 size={18} />
                </div>
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "24px 28px",
                    boxShadow: "0 2px 16px rgba(0,0,0,.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        background: "#eff6ff",
                        color: "#2563eb",
                        fontWeight: 800,
                        fontSize: "12px",
                        letterSpacing: ".08em",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        border: "1px solid #bfdbfe",
                      }}
                    >
                      {m.year}
                    </span>
                    <h3
                      style={{
                        color: "#0f172a",
                        fontWeight: 800,
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      {m.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ═══════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: "120px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <span className="dc-eyebrow">
              <Users size={12} /> The people
            </span>
            <h2 className="dc-display" style={{ marginBottom: "16px" }}>
              Meet the team <span className="dc-grad">behind the platform</span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "17px",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Doctors, engineers, and designers working in lockstep to build
              software that clinicians and patients trust.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {team.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform .25s, box-shadow .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 56px rgba(37,99,235,.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    height: "140px",
                    background: "linear-gradient(135deg, #1e3a8a, #0e7490)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.14)",
                      border: "3px solid rgba(255,255,255,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "22px",
                      color: "#fff",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {t.init}
                  </div>
                </div>
                {/* Card body */}
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      color: "#0f172a",
                      fontWeight: 800,
                      fontSize: "17px",
                      margin: "0 0 4px",
                    }}
                  >
                    {t.name}
                  </h3>
                  <p
                    style={{
                      color: "#2563eb",
                      fontWeight: 600,
                      fontSize: "13px",
                      margin: "0 0 8px",
                    }}
                  >
                    {t.role}
                  </p>
                  <span
                    style={{
                      background: "#f0fdf4",
                      color: "#059669",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      border: "1px solid #a7f3d0",
                    }}
                  >
                    {t.spec}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIAL QUOTE ══════════════════════════════ */}
      <section style={{ background: "#f8fafc", padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="dc-quote">
            <p
              style={{
                color: "#1e40af",
                fontWeight: 600,
                fontSize: "15px",
                margin: "0 0 6px",
                letterSpacing: ".02em",
              }}
            >
              Dr. Sara Mohamed — General Practitioner
            </p>
            <p
              style={{
                color: "#0f172a",
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: 1.75,
                margin: "0 0 20px",
              }}
            >
              DoctorCare cut my no-show rate in half. Patients actually show up
              because the reminders are timely, the records are ready, and the
              whole experience feels trustworthy from their first click.
            </p>
            <div style={{ display: "flex", gap: "4px" }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  style={{ fill: "#f59e0b", color: "#f59e0b" }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA BAND ═══════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="dc-cta-band">
            {/* decorative corner gradients */}
            <div
              style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(37,99,235,.25), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-60px",
                left: "-60px",
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(6,182,212,.15), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "64px 56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "32px",
              }}
            >
              <div style={{ maxWidth: "520px" }}>
                <p
                  style={{
                    color: "rgba(255,255,255,.5)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  Ready to experience better care?
                </p>
                <h2
                  style={{
                    color: "#ffffff",
                    fontWeight: 900,
                    fontSize: "clamp(28px, 4vw, 44px)",
                    lineHeight: 1.1,
                    letterSpacing: "-.02em",
                    marginBottom: "14px",
                  }}
                >
                  Book your first appointment{" "}
                  <span
                    style={{
                      background: "linear-gradient(120deg, #60a5fa, #34d399)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    today.
                  </span>
                </h2>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Join 15,000+ patients who found the right specialist in
                  minutes — not weeks.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <Link to="/doctors" className="dc-btn">
                  Find a specialist <ArrowRight size={17} />
                </Link>
                <Link
                  to="/departments"
                  className="dc-btn-outline"
                  style={{
                    border: "2px solid rgba(255,255,255,.2)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,.07)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.2)";
                  }}
                >
                  Browse departments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
