import React from "react";
import { Link } from "react-router-dom";

import {
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <style>{`
      .footer{
        background:#0f172a;
        color:white;
      }

      .footer-container{
        max-width:1280px;
        margin:auto;
        padding:80px 24px 40px;
      }

      .footer-grid{
        display:grid;
        grid-template-columns:2fr 1fr 1fr 1.3fr;
        gap:60px;
      }

      @media(max-width:1024px){
        .footer-grid{
          grid-template-columns:repeat(2,1fr);
        }
      }

      @media(max-width:640px){
        .footer-grid{
          grid-template-columns:1fr;
        }
      }

      .footer-logo{
        display:flex;
        align-items:center;
        gap:14px;
        margin-bottom:22px;
      }

      .footer-logo-icon{
        width:54px;
        height:54px;
        border-radius:14px;
        background:linear-gradient(135deg,#2563eb,#06b6d4);
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 10px 30px rgba(37,99,235,.35);
      }

      .footer-logo-name{
        font-size:24px;
        font-weight:700;
      }

      .footer-logo-sub{
        font-size:12px;
        color:#94a3b8;
        text-transform:uppercase;
        letter-spacing:2px;
      }

      .footer-desc{
        color:#cbd5e1;
        line-height:1.8;
        font-size:15px;
        margin-bottom:28px;
      }

      .footer-title{
        font-size:18px;
        font-weight:700;
        margin-bottom:22px;
        position:relative;
      }

      .footer-title::after{
        content:"";
        position:absolute;
        left:0;
        bottom:-10px;
        width:45px;
        height:3px;
        border-radius:20px;
        background:linear-gradient(90deg,#2563eb,#06b6d4);
      }

      .footer-links{
        display:flex;
        flex-direction:column;
        gap:15px;
      }

      .footer-link{
        display:flex;
        align-items:center;
        gap:10px;
        color:#cbd5e1;
        text-decoration:none;
        transition:.25s;
        font-size:15px;
      }

      .footer-link svg{
        width:16px;
        color:#3b82f6;
      }

      .footer-link:hover{
        color:white;
        transform:translateX(6px);
      }

      .contact-item{
        display:flex;
        align-items:flex-start;
        gap:14px;
        margin-bottom:18px;
      }

      .contact-icon{
        width:42px;
        height:42px;
        border-radius:12px;
        background:rgba(59,130,246,.15);
        display:flex;
        align-items:center;
        justify-content:center;
        color:#60a5fa;
        flex-shrink:0;
      }

      .contact-text{
        color:#cbd5e1;
        line-height:1.7;
        font-size:15px;
      }

      .socials{
        display:flex;
        gap:14px;
        margin-top:30px;
      }

      .social-btn{
        width:46px;
        height:46px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        background:#1e293b;
        transition:.3s;
        text-decoration:none;
      }

      .social-btn:hover{
        background:linear-gradient(135deg,#2563eb,#06b6d4);
        transform:translateY(-5px);
        box-shadow:0 15px 30px rgba(37,99,235,.35);
      }

      .newsletter{
        margin-top:35px;
        padding:24px;
        border-radius:18px;
        background:rgba(255,255,255,.05);
        border:1px solid rgba(255,255,255,.08);
      }

      .newsletter h4{
        font-size:18px;
        margin-bottom:10px;
      }

      .newsletter p{
        color:#cbd5e1;
        font-size:14px;
        margin-bottom:18px;
        line-height:1.7;
      }

      .newsletter-input{
        width:100%;
        padding:14px 16px;
        border:none;
        outline:none;
        border-radius:10px;
        margin-bottom:14px;
        background:#1e293b;
        color:white;
      }

      .newsletter-btn{
        width:100%;
        border:none;
        cursor:pointer;
        padding:14px;
        border-radius:10px;
        font-weight:600;
        color:white;
        background:linear-gradient(135deg,#2563eb,#1d4ed8);
        transition:.3s;
      }

      .newsletter-btn:hover{
        opacity:.9;
        transform:translateY(-2px);
      }

      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand */}

            <div>
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <Stethoscope />
                </div>

                <div>
                  <div className="footer-logo-name">ALRAHIIM</div>

                  <div className="footer-logo-sub">Appointment System</div>
                </div>
              </div>

              <p className="footer-desc">
                DoctorCare is an online doctor appointment platform designed to
                help patients find experienced doctors, schedule appointments
                easily, and receive quality healthcare services anytime and
                anywhere.
              </p>

              <div className="socials">
                <a href="#" className="social-btn">
                  <FaFacebookF size={18} />
                </a>

                <a href="#" className="social-btn">
                  <FaXTwitter size={18} />
                </a>

                <a href="#" className="social-btn">
                  <FaInstagram size={18} />
                </a>

                <a href="#" className="social-btn">
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}

            <div>
              <h3 className="footer-title">Quick Links</h3>

              <div className="footer-links">
                <Link className="footer-link" to="/">
                  <ChevronRight />
                  Home
                </Link>

                <Link className="footer-link" to="/doctors">
                  <ChevronRight />
                  Doctors
                </Link>

                <Link className="footer-link" to="/departments">
                  <ChevronRight />
                  Departments
                </Link>

                <Link className="footer-link" to="/about">
                  <ChevronRight />
                  About
                </Link>

                <Link className="footer-link" to="/contact">
                  <ChevronRight />
                  Contact
                </Link>
              </div>
            </div>

            {/* Services */}

            <div>
              <h3 className="footer-title">Services</h3>

              <div className="footer-links">
                <span className="footer-link">
                  <ChevronRight />
                  Online Appointment
                </span>

                <span className="footer-link">
                  <ChevronRight />
                  Medical Records
                </span>

                <span className="footer-link">
                  <ChevronRight />
                  Doctor Consultation
                </span>

                <span className="footer-link">
                  <ChevronRight />
                  Health Monitoring
                </span>

                <span className="footer-link">
                  <ChevronRight />
                  Secure Payments
                </span>
              </div>
            </div>

            {/* Contact */}

            <div>
              <h3 className="footer-title">Contact Us</h3>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={18} />
                </div>

                <div className="contact-text">Mogadishu, Somalia</div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={18} />
                </div>

                <div className="contact-text">+252 615 558 699</div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>

                <div className="contact-text">support@doctorcare.com</div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={18} />
                </div>

                <div className="contact-text">
                  Monday - Sunday
                  <br />
                  24 Hours Available
                </div>
              </div>

              <div className="newsletter">
                <h4>Newsletter</h4>

                <p>Subscribe to receive healthcare news and updates.</p>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />

                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
          {/* ================= Bottom ================= */}

          <div
            style={{
              marginTop: "70px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                lineHeight: "1.8",
              }}
            >
              © {new Date().getFullYear()}{" "}
              <span
                style={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                DoctorCare
              </span>
              . All Rights Reserved.
              <br />
              Built with ❤️ for Better Healthcare.
            </div>

            <div
              style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/privacy-policy"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: ".25s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: ".25s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
              >
                Terms of Service
              </Link>

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg,#2563eb,#06b6d4)",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "700",
                  boxShadow: "0 10px 25px rgba(37,99,235,.35)",
                  transition: ".3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
