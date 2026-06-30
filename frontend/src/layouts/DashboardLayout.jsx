import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Bell, Search, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import Sidebar from "../components/layout/dashboard/Sidebar";
import { selectUser } from "../features/auth/authSlice";

const DashboardLayout = () => {
  const user = useSelector(selectUser);
  const location = useLocation();

  // Dynamically compute breadcrumb/section marker names based on the current URI layout structure
  const getSectionTitle = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length <= 1) return "System Overview";

    // Grabs the last structural segment slug and cleans up dash hyphens
    const rawSegment = pathParts[pathParts.length - 1];
    return rawSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans antialiased text-slate-800">
      {/* 1. FIXED STRUCTURAL SIDEBAR NAVIGATION RAIL */}
      <Sidebar />

      {/* 2. CORE CONTENT FLUID WORKSPACE AREA */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* TOP PANEL NAVIGATION UTILITY BAR */}
        <header className="h-20 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
          {/* Section Indicator Breadcrumb */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Workspace Panel
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                {getSectionTitle()}
              </h2>
            </div>
          </div>

          {/* Quick Actions Matrix */}
          <div className="flex items-center gap-6">
            {/* Context Global Search Form Input Box */}
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search console database..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:bg-white transition"
              />
            </div>

            {/* Notification Badge Bell Frame */}
            <button
              type="button"
              className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse" />
            </button>

            {/* Micro Separation Rule */}
            <div className="h-6 w-px bg-slate-200" />

            {/* Minimal Operator Status Panel */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-slate-900 block leading-none">
                  {user?.full_name || "Practitioner"}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block mt-1">
                  {user?.role_name || "Operator"}
                </span>
              </div>
              <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-inner">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
          </div>
        </header>

        {/* 3. NESTED ROUTE VIEW PANEL BOX (SCROLLABLE CONTAINER) */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
