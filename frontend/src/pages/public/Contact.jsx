import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  ShieldCheck,
  Ambulance,
  ArrowRight,
  Users,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="bg-white">
      {/* ==========================================================
                          HERO SECTION
      ========================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        {/* Background Blur */}
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-cyan-300">
                <ShieldCheck size={16} />
                Contact DoctorCare
              </span>

              <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-white">
                We're here
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  to help you.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                Whether you need medical assistance, appointment booking,
                emergency support, or general information, our healthcare
                professionals are available to help every day.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-blue-500/30"
                >
                  Find a Doctor
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="tel:+252610000000"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:border-cyan-400"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>

            {/* Right */}

            <div className="relative">
              {/* Emergency Card */}

              <div className="rounded-3xl border border-red-400/20 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500">
                    <Ambulance className="text-white" size={34} />
                  </div>

                  <div>
                    <p className="text-red-300 font-semibold uppercase tracking-widest text-sm">
                      Emergency
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-white">
                      +252 61 XXX XXXX
                    </h3>
                  </div>
                </div>

                <p className="mt-8 text-slate-300 leading-7">
                  Our emergency response team is available
                  <span className="font-semibold text-cyan-300">
                    {" "}
                    24 hours a day, 7 days a week
                  </span>
                  , providing immediate medical assistance whenever you need it.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-900/60 p-5">
                    <Clock3 className="text-cyan-400 mb-3" />

                    <p className="text-white font-bold">24/7 Service</p>

                    <p className="text-slate-400 text-sm mt-1">
                      Always available
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900/60 p-5">
                    <HeartPulse className="text-emerald-400 mb-3" />

                    <p className="text-white font-bold">Fast Response</p>

                    <p className="text-slate-400 text-sm mt-1">
                      Immediate support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
                      QUICK CONTACT CARDS
      ========================================================== */}

      <section className="-mt-16 relative z-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Phone */}

            <div className="rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <Phone className="text-blue-600" />
              </div>

              <h3 className="mt-6 text-xl font-bold">Call Us</h3>

              <p className="mt-3 text-slate-500">
                Speak directly with our support team.
              </p>

              <p className="mt-5 font-bold text-blue-600">+252 61 XXX XXXX</p>
            </div>

            {/* Email */}

            <div className="rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                <Mail className="text-cyan-600" />
              </div>

              <h3 className="mt-6 text-xl font-bold">Email</h3>

              <p className="mt-3 text-slate-500">
                Send your questions anytime.
              </p>

              <p className="mt-5 font-bold text-cyan-600">
                info@doctorcare.com
              </p>
            </div>

            {/* Address */}

            <div className="rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                <MapPin className="text-emerald-600" />
              </div>

              <h3 className="mt-6 text-xl font-bold">Visit Us</h3>

              <p className="mt-3 text-slate-500">
                Yaqshiid District, Mogadishu, Somalia
              </p>
            </div>

            {/* Hours */}

            <div className="rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                <Clock3 className="text-orange-600" />
              </div>

              <h3 className="mt-6 text-xl font-bold">Working Hours</h3>

              <p className="mt-3 text-slate-500">Monday - Saturday</p>

              <p className="mt-5 font-bold text-orange-600">
                8:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
                        HOSPITAL STATS
      ========================================================== */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              {
                number: "150+",
                label: "Doctors",
                icon: Users,
              },
              {
                number: "30+",
                label: "Departments",
                icon: Stethoscope,
              },
              {
                number: "15K+",
                label: "Patients",
                icon: HeartPulse,
              },
              {
                number: "10+",
                label: "Years",
                icon: ShieldCheck,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border bg-white p-10 text-center shadow-sm transition hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                    <Icon className="text-blue-600" />
                  </div>

                  <h2 className="mt-6 text-5xl font-black text-slate-900">
                    {item.number}
                  </h2>

                  <p className="mt-2 text-slate-500 font-medium">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ==========================================================
                      CONTACT FORM + INFORMATION
      ========================================================== */}

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* ===================================================
                            CONTACT FORM
            =================================================== */}

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Contact Form
              </span>

              <h2 className="mt-6 text-4xl font-black text-slate-900">
                Send us a message
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-500">
                Have a question? Need help booking an appointment? Fill out the
                form below and our support team will contact you as soon as
                possible.
              </p>

              <form className="mt-10 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold text-slate-700">
                      First Name
                    </label>

                    <input
                      type="text"
                      placeholder="Mohamed"
                      className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-slate-700">
                      Last Name
                    </label>

                    <input
                      type="text"
                      placeholder="Ahmed"
                      className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="+25261xxxxxxx"
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Appointment Inquiry"
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-4 text-lg font-bold text-white transition hover:shadow-xl hover:shadow-blue-500/30">
                  Send Message
                </button>
              </form>
            </div>

            {/* ===================================================
                      HOSPITAL INFORMATION
            =================================================== */}

            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  Hospital Information
                </span>

                <h2 className="mt-6 text-4xl font-black text-slate-900">
                  Visit DoctorCare
                </h2>

                <p className="mt-4 text-lg leading-8 text-slate-500">
                  Our hospital is conveniently located in Yaqshiid District,
                  Mogadishu, providing modern healthcare services with
                  experienced medical professionals.
                </p>
              </div>

              {/* Contact Info */}

              <div className="space-y-5">
                <div className="flex gap-5 rounded-2xl bg-white p-6 shadow">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                    <MapPin className="text-blue-600" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">
                      Hospital Address
                    </h4>

                    <p className="mt-2 text-slate-500 leading-7">
                      Yaqshiid District, Mogadishu, Banaadir, Somalia
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 rounded-2xl bg-white p-6 shadow">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100">
                    <Phone className="text-cyan-600" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">Telephone</h4>

                    <p className="mt-2 text-slate-500">+252 61 XXX XXXX</p>

                    <p className="text-slate-500">+252 61 XXX XXXX</p>
                  </div>
                </div>

                <div className="flex gap-5 rounded-2xl bg-white p-6 shadow">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                    <Mail className="text-emerald-600" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>

                    <p className="mt-2 text-slate-500">info@doctorcare.com</p>

                    <p className="text-slate-500">support@doctorcare.com</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}

              <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-white">
                <div className="flex items-center gap-3">
                  <Clock3 size={28} />

                  <h3 className="text-2xl font-bold">Working Hours</h3>
                </div>

                <div className="mt-8 space-y-5">
                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span>Monday</span>

                    <span>08:00 - 20:00</span>
                  </div>

                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span>Tuesday</span>

                    <span>08:00 - 20:00</span>
                  </div>

                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span>Wednesday</span>

                    <span>08:00 - 20:00</span>
                  </div>

                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span>Thursday</span>

                    <span>08:00 - 20:00</span>
                  </div>

                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span>Friday</span>

                    <span>08:00 - 20:00</span>
                  </div>

                  <div className="flex justify-between border-b border-white/20 pb-3">
                    <span>Saturday</span>

                    <span>09:00 - 18:00</span>
                  </div>

                  <div className="flex justify-between font-bold text-yellow-300">
                    <span>Sunday</span>

                    <span>Emergency Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==========================================================
                          GOOGLE MAP
      ========================================================== */}

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Find Us
            </span>

            <h2 className="mt-6 text-5xl font-black text-slate-900">
              Visit Our Hospital
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              Easily locate DoctorCare Hospital in Yaqshiid District, Mogadishu.
              We are conveniently located and accessible from every part of the
              city.
            </p>
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl border shadow-2xl">
            <iframe
              title="DoctorCare Hospital"
              src="https://maps.google.com/maps?q=Yaqshiid%20District%20Mogadishu&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="h-[550px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ==========================================================
                          FAQ SECTION
      ========================================================== */}

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              FAQ
            </span>

            <h2 className="mt-6 text-5xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-16 space-y-6">
            {[
              {
                q: "How can I book an appointment?",
                a: "You can book online by selecting a department and choosing your preferred doctor and available time.",
              },
              {
                q: "Do you provide emergency services?",
                a: "Yes. Our emergency department operates 24 hours a day, 7 days a week.",
              },
              {
                q: "Can I cancel my appointment?",
                a: "Yes. Patients can cancel or reschedule appointments directly from their dashboard.",
              },
              {
                q: "Do you accept walk-in patients?",
                a: "Yes, although appointments are recommended to reduce waiting time.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">{faq.q}</h3>

                <p className="mt-4 leading-8 text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================
                        EMERGENCY SECTION
      ========================================================== */}

      <section className="py-24 bg-gradient-to-r  from-slate-900 via-blue-900 to-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white">
                Emergency Support
              </span>

              <h2 className="mt-6 text-5xl font-black leading-tight text-white">
                Need Immediate
                <br />
                Medical Help?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-red-100">
                Our emergency medical team is available around the clock. Call
                immediately if you require urgent medical assistance.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-2xl">
              <h3 className="text-center text-2xl font-bold text-slate-900">
                Emergency Hotline
              </h3>

              <h1 className="mt-6 text-center text-5xl font-black text-blue-600">
                +252 61 XXX XXXX
              </h1>

              <a
                href="tel:+252610000000"
                className="mt-10 flex justify-center rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:blue-red-700"
              >
                Call Emergency
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
                          FINAL CTA
      ========================================================== */}

      <section className="relative overflow-hidden bg-slate-950 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px] opacity-10"></div>

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-5xl font-black text-white">
            Your Health
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Our Priority
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Join thousands of patients who trust DoctorCare for quality
            healthcare services, experienced doctors, and modern medical
            technology.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              to="/doctors"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Find a Doctor
            </Link>

            <Link
              to="/appointments"
              className="rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition hover:border-blue-500 hover:bg-white/5"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
