import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Accessibility,
  Stethoscope,
  Building2,
  GitMerge,
  CalendarDays,
  FileHeart,
  Receipt,
  BarChart3,
  UserCircle,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { selectUser, logoutUser } from "../../../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Normalize role checks to prevent lowercase match issues
  const userRole = user?.role_name?.toLowerCase() || "";

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  /* ================= NAVIGATION CONFIG MATRIX ================= */
  const menuConfigs = {
    administrator: [
      {
        path: "/dashboard/admin",
        label: "Overview Metrics",
        icon: LayoutDashboard,
        end: true,
      },
      // {
      //   path: "/dashboard/admin/users",
      //   label: "User Access Control",
      //   icon: Users,
      // },
      // {
      //   path: "/dashboard/admin/patients",
      //   label: "Patient Directory",
      //   icon: Accessibility,
      // },
      {
        path: "/dashboard/admin/doctors",
        label: "Medical Doctors",
        icon: Stethoscope,
      },
      {
        path: "/dashboard/admin/departments",
        label: "Hospital Departments",
        icon: Building2,
      },
      {
        path: "/dashboard/admin/doctor-departments",
        label: "Staff Allocations",
        icon: GitMerge,
      },
      {
        path: "/dashboard/admin/schedules",
        label: "Shift Schedules",
        icon: CalendarDays,
      },
      {
        path: "/dashboard/admin/appointments",
        label: "Appointment Master",
        icon: FileHeart,
      },
      {
        path: "/dashboard/admin/medical-records",
        label: "Clinical Records",
        icon: Activity,
      },
      {
        path: "/dashboard/admin/payments",
        label: "Financial Ledgers",
        icon: Receipt,
      },
      {
        path: "/dashboard/admin/reports",
        label: "Analytics Reports",
        icon: BarChart3,
      },
      {
        path: "/dashboard/admin/profile",
        label: "Admin Profile Settings",
        icon: UserCircle,
      },
    ],
    doctor: [
      {
        path: "/dashboard/doctor",
        label: "Doctor Dashboard",
        icon: LayoutDashboard,
        end: true,
      },
      {
        path: "/dashboard/doctor/appointments",
        label: "My Appointments",
        icon: CalendarDays,
      },
      {
        path: "/dashboard/doctor/medical-records",
        label: "Patient Checkups",
        icon: Activity,
      },
      {
        path: "/dashboard/doctor/profile",
        label: "Staff Profile Card",
        icon: UserCircle,
      },
    ],
  };

  const activeMenuItems = menuConfigs[userRole] || [];

  return (
    <aside className="w-72 bg-gradient-to-b from-blue-700 via-blue-600 to-cyan-600 text-slate-100 flex flex-col h-screen sticky top-0 shrink-0 shadow-xl">
      {/* 1. BRAND PLATFORM HEADER */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white text-blue-600 flex items-center justify-center font-black shadow-lg shadow-blue-900/20">
          <Stethoscope size={20} className="text-blue-600" />
        </div>
        <div>
          <div className="text-base font-bold text-white tracking-tight leading-none">
            DoctorCare
          </div>
          <div className="text-[10px] font-bold text-cyan-200 tracking-widest uppercase mt-1">
            Healthcare System
          </div>
        </div>
      </div>

      {/* 2. PREMIUM USER METRICS BANNER */}
      <div className="p-5 mx-4 my-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl flex items-center gap-4 shadow-sm">
        <div className="relative">
          <img
            src={
              user?.profile_image
                ? `http://localhost:5000/${user.profile_image}`
                : "https://placehold.co/100"
            }
            alt="Operator Avatar"
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/40"
          />
          <span className="absolute bottom-[-2px] right-[-2px] h-3.5 w-3.5 bg-emerald-400 border-2 border-blue-600 rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-white truncate leading-snug">
            {user?.full_name || "Medical Practitioner"}
          </h2>
          <p className="text-xs text-blue-100/80 truncate mt-0.5">
            {user?.email}
          </p>
          <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-white/20 border border-white/10 rounded-md text-[10px] font-extrabold tracking-wider text-white uppercase">
            <ShieldAlert className="h-3 w-3 text-cyan-200" />
            {user?.role_name || "Attending"}
          </span>
        </div>
      </div>

      {/* 3. DYNAMIC SCROLLABLE LINKS TREE */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        <div className="px-3 mb-2 text-[10px] font-extrabold text-blue-200/70 uppercase tracking-widest">
          Core Workflows
        </div>
        {activeMenuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3.5 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 border-l-4 border-white text-white shadow-sm font-bold"
                    : "hover:bg-white/10 text-blue-100 hover:text-white border-l-4 border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-3.5">
                <IconComponent className="h-4.5 w-4.5 group-hover:scale-105 transition-transform text-white/80 group-hover:text-white" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-all text-white/60" />
            </NavLink>
          );
        })}
      </nav>

      {/* 4. LAYOUT TERMINATION ACTIONS FOOTER */}
      <div className="p-4 flex gap-4 border-t border-white/10 bg-sky-950/20">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-200 hover:bg-rose-500/20 border border-transparent hover:border-rose-400/30 rounded-xl transition"
        >
          <IoArrowBackOutline className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-200 hover:bg-rose-500/20 border border-transparent hover:border-rose-400/30 rounded-xl transition"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
