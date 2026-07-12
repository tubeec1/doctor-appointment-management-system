import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Building2,
  Phone,
  Info,
  Home,
  ChevronDown,
} from "lucide-react";

import { SiGotomeeting } from "react-icons/si";
import { TbBrandBooking } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { CiMedicalCross } from "react-icons/ci";

import {
  logoutUser,
  selectIsAuthenticated,
  selectUser,
} from "../../../features/auth/authSlice";
import Appointments from "../../../pages/admin/Appointments";

const Header = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);

  /* ------------------------------------------------------- */
  /* Helpers                                                 */
  /* ------------------------------------------------------- */

  const getDashboardLink = () => {
    if (!user) return "/";

    switch (user.role_name) {
      case "Administrator":
        return "/dashboard/admin";

      case "Doctor":
        return "/dashboard/doctor";

      default:
        return "/";
    }
  };

  const getProfileImage = () => {
    if (!user?.profile_image) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.full_name || "User",
      )}&background=2563eb&color=fff`;
    }

    return `http://localhost:5000/${user.profile_image}`;
  };

  const handleLogout = () => {
    dispatch(logoutUser());

    setProfileOpen(false);
    setMobileOpen(false);
  };

  /* ------------------------------------------------------- */
  /* Effects                                                 */
  /* ------------------------------------------------------- */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------------------------------------------- */
  /* Navigation Links                                        */
  /* ------------------------------------------------------- */

  const navLinks = [
    {
      to: "/",
      label: "Home",
      icon: <Home size={15} />,
    },
    {
      to: "/doctors",
      label: "Doctors",
      icon: <Stethoscope size={15} />,
    },
    {
      to: "/departments",
      label: "Departments",
      icon: <Building2 size={15} />,
    },
    {
      to: "/about",
      label: "About",
      icon: <Info size={15} />,
    },
    {
      to: "/contact",
      label: "Contact",
      icon: <Phone size={15} />,
    },
  ];

  return (
    <>
      <style>{`.header-root {
  position: sticky;
  top: 0;
  z-index: 50;
  transition: all 0.3s ease;
}

.header-root.top {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-root.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow:
    0 1px 0 rgba(0,0,0,.05),
    0 10px 30px rgba(15,23,42,.06);
}

/* ================= Logo ================= */

.header-inner{
  max-width:1280px;
  margin:auto;
  height:70px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 24px;
  gap:24px;
}

.logo-mark{
  width:42px;
  height:42px;
  border-radius:12px;
  background:linear-gradient(135deg,#2563eb,#06b6d4);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  box-shadow:0 8px 18px rgba(37,99,235,.25);
}

.logo-name{
  font-size:1.1rem;
  font-weight:700;
  color:#0f172a;
}

.logo-sub{
  font-size:.72rem;
  color:#64748b;
  letter-spacing:.08em;
  text-transform:uppercase;
}

/* ================= Navigation ================= */

.nav-divider{
  width:1px;
  height:28px;
  background:#e2e8f0;
}

.nav-link{
  position:relative;
  display:flex;
  align-items:center;
  gap:6px;
  padding:8px 12px;
  text-decoration:none;
  color:#475569;
  font-size:.9rem;
  font-weight:500;
  transition:.25s;
}

.nav-link::after{
  content:"";
  position:absolute;
  left:0;
  bottom:0;
  width:0;
  height:2px;
  border-radius:999px;
  background:linear-gradient(90deg,#2563eb,#06b6d4);
  transition:.25s;
}

.nav-link:hover{
  color:#2563eb;
}

.nav-link:hover::after,
.nav-link.active::after{
  width:100%;
}

.nav-link.active{
  color:#2563eb;
}

/* ================= Buttons ================= */

.btn-outline{
  padding:9px 20px;
  border-radius:10px;
  border:1.5px solid #2563eb;
  color:#2563eb;
  text-decoration:none;
  font-weight:600;
  transition:.25s;
}

.btn-outline:hover{
  background:#eff6ff;
}

.btn-solid{
  padding:9px 22px;
  border-radius:10px;
  color:#fff;
  text-decoration:none;
  font-weight:600;
  background:linear-gradient(135deg,#2563eb,#1d4ed8);
  box-shadow:0 8px 20px rgba(37,99,235,.22);
  transition:.25s;
}

.btn-solid:hover{
  opacity:.92;
}

/* ================= Avatar ================= */

.avatar-btn{
  display:flex;
  align-items:center;
  gap:12px;
  background:#fff;
  border:1px solid #e2e8f0;
  border-radius:999px;
  padding:4px 12px 4px 4px;
  cursor:pointer;
  transition:.25s;
}

.avatar-btn:hover{
  border-color:#2563eb;
}

.avatar-image{
  width:40px;
  height:40px;
  border-radius:50%;
  object-fit:cover;
  border:2px solid #dbeafe;
}

.avatar-name{
  font-size:.85rem;
  font-weight:700;
  color:#0f172a;
  line-height:1.2;
}

.avatar-role{
  font-size:.72rem;
  color:#64748b;
}

/* ================= Dropdown ================= */

.profile-dropdown{
  position:absolute;
  right:0;
  top:calc(100% + 10px);
  width:280px;
  background:#fff;
  border-radius:16px;
  overflow:hidden;
  border:1px solid #e2e8f0;
  box-shadow:0 20px 45px rgba(15,23,42,.15);
  animation:dropdown .18s ease;
}

@keyframes dropdown{
  from{
    opacity:0;
    transform:translateY(-8px);
  }
  to{
    opacity:1;
    transform:translateY(0);
  }
}

.dropdown-header{
  display:flex;
  gap:14px;
  padding:18px;
  background:linear-gradient(135deg,#eff6ff,#ecfeff);
}

.dropdown-avatar{
  width:56px;
  height:56px;
  border-radius:50%;
  object-fit:cover;
}

.dropdown-name{
  font-size:.95rem;
  font-weight:700;
  color:#0f172a;
}

.dropdown-role{
  font-size:.72rem;
  color:#2563eb;
  font-weight:600;
}

.dropdown-email{
  margin-top:2px;
  font-size:.75rem;
  color:#64748b;
}

.dropdown-item{
  display:flex;
  align-items:center;
  gap:12px;
  width:100%;
  padding:13px 18px;
  background:#fff;
  border:none;
  text-decoration:none;
  color:#334155;
  font-size:.9rem;
  cursor:pointer;
  transition:.2s;
}

.dropdown-item:hover{
  background:#f8fafc;
  color:#2563eb;
}

.dropdown-item.logout{
  color:#dc2626;
  border-top:1px solid #f1f5f9;
}

.dropdown-item.logout:hover{
  background:#fff1f2;
}

/* ================= Mobile ================= */

.mobile-btn{
  display:none;
}

.mobile-panel{
  background:#fff;
  border-top:1px solid #e2e8f0;
  padding:20px;
}

.mobile-nav-link{
  display:flex;
  align-items:center;
  gap:10px;
  padding:12px;
  text-decoration:none;
  color:#475569;
  border-radius:10px;
  transition:.2s;
}

.mobile-nav-link.active,
.mobile-nav-link:hover{
  background:#eff6ff;
  color:#2563eb;
}

.mobile-divider{
  height:1px;
  background:#e2e8f0;
  margin:18px 0;
}

@media(max-width:1023px){

.desktop-nav,
.desktop-auth{
display:none!important;
}

.mobile-btn{
display:flex;
align-items:center;
justify-content:center;
width:42px;
height:42px;
border-radius:10px;
border:1px solid #e2e8f0;
background:#fff;
cursor:pointer;
}

}

@media(min-width:1024px){

.mobile-btn{
display:none;
}

.mobile-drawer{
display:none;
}      `}</style>
      <header className={`header-root ${scrolled ? "scrolled" : "top"}`}>
        <div className="header-inner">
          {/* ================= Logo ================= */}

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div className="logo-mark">
              <Stethoscope size={20} />
            </div>

            <div>
              <div className="logo-name">ALRAHIIM</div>
              <div className="logo-sub">Healthcare System</div>
            </div>
          </Link>

          <div className="nav-divider desktop-nav"></div>

          {/* ================= Desktop Navigation ================= */}

          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flex: 1,
            }}
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* ================= Desktop Right ================= */}

          <div
            className="desktop-auth"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-outline">
                  Login
                </Link>

                <Link to="/signup" className="btn-solid">
                  Get Started
                </Link>
              </>
            ) : (
              <div
                ref={profileRef}
                style={{
                  position: "relative",
                }}
              >
                <button
                  className="avatar-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={getProfileImage()}
                    alt={user?.full_name}
                    className="avatar-image"
                  />

                  <div
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <div className="avatar-name">{user?.full_name}</div>

                    <div className="avatar-role">{user?.role_name}</div>
                  </div>

                  <ChevronDown
                    size={15}
                    style={{
                      transition: ".25s",
                      transform: profileOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <img
                        src={getProfileImage()}
                        alt={user?.full_name}
                        className="dropdown-avatar"
                      />

                      <div>
                        <div className="dropdown-name">{user?.full_name}</div>

                        <div className="dropdown-role">{user?.role_name}</div>

                        <div className="dropdown-email">{user?.email}</div>
                      </div>
                    </div>

                    {user?.role_name !== "Patient" && (
                      <Link
                        to={getDashboardLink()}
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                    )}
                    {user?.role_name === "Patient" && (
                      <>
                        <Link
                          to="/book-appointment"
                          className="dropdown-item"
                          onClick={() => setProfileOpen(false)}
                        >
                          <TbBrandBooking size={18} />
                          Book Appointment
                        </Link>
                        <Link to="/my-appointments" className="dropdown-item">
                          <SiGotomeeting size={18} /> My Appointments
                        </Link>

                        <Link
                          to="/my-medical-records"
                          className="dropdown-item"
                          onClick={() => setProfileOpen(false)}
                        >
                          <CiMedicalCross size={18} />
                          My Medical Records
                        </Link>
                      </>
                    )}

                    <Link to="/my-profile" className="dropdown-item">
                      <CgProfile size={18} /> My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ================= Mobile Toggle ================= */}

          <button
            className="mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* ================= Mobile Drawer ================= */}

        {mobileOpen && (
          <div className="mobile-drawer">
            <div className="mobile-panel">
              {/* Navigation */}

              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mobile-divider"></div>

              {!isAuthenticated ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Link
                    to="/login"
                    className="btn-outline"
                    onClick={() => setMobileOpen(false)}
                    style={{ justifyContent: "center" }}
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="btn-solid"
                    onClick={() => setMobileOpen(false)}
                    style={{ justifyContent: "center" }}
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <>
                  {/* User Card */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "18px",
                    }}
                  >
                    <img
                      src={getProfileImage()}
                      alt={user?.full_name}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #dbeafe",
                      }}
                    />

                    <div>
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "#0f172a",
                        }}
                      >
                        {user?.full_name}
                      </h3>

                      <p
                        style={{
                          fontSize: ".8rem",
                          color: "#2563eb",
                          fontWeight: 600,
                        }}
                      >
                        {user?.role_name}
                      </p>

                      <p
                        style={{
                          fontSize: ".75rem",
                          color: "#64748b",
                        }}
                      >
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {user?.role_name !== "Patient" && (
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setMobileOpen(false)}
                      className="mobile-nav-link"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="mobile-nav-link"
                    style={{
                      border: "none",
                      background: "#fff5f5",
                      color: "#dc2626",
                      cursor: "pointer",
                    }}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
