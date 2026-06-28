import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Stethoscope } from "lucide-react";

import Container from "../../common/Container";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Stethoscope size={24} />
              </div>

              <div>
                <h3 className="font-bold text-white">Doctor Appointment</h3>

                <p className="text-sm text-slate-400">Management System</p>
              </div>
            </div>

            <p className="leading-7 text-slate-400">
              Book appointments quickly with trusted doctors, manage medical
              records, and simplify healthcare services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-blue-400">
                  Doctors
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-blue-400">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Services</h3>

            <ul className="space-y-3">
              <li>Appointments</li>
              <li>Medical Records</li>
              <li>Payments</li>
              <li>Departments</li>
              <li>Doctors</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-400" />
                <span>Mogadishu, Somalia</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />
                <span>+252 61 0000000</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <span>info@hospital.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 py-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Doctor Appointment Management System. All
          rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
