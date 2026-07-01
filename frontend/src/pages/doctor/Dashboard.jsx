import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  Activity,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  getDoctorDashboard,
  clearDashboardError,
  clearDashboardMessage,
  selectDashboardStatistics,
  selectDashboardLoading,
  selectDashboardError,
  selectDashboardMessage,
} from "../../features/dashboard/dashboardSlice"; // Adjust this import path to match your folder hierarchy

const Dashboard = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const stats = useSelector(selectDashboardStatistics);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  const message = useSelector(selectDashboardMessage);

  // Initial Fetch Effect
  useEffect(() => {
    dispatch(getDoctorDashboard());
  }, [dispatch]);

  // Toast notifications handling
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearDashboardError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      // Avoid spamming notifications on background re-fetches unless intended

      dispatch(clearDashboardMessage());
    }
  }, [message, dispatch]);

  // Dynamic time-based greeting for clinical personalization
  const getTimeBasedGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleRefresh = () => {
    dispatch(getDoctorDashboard());
  };

  // Loading State Spinner Component
  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3">
        <LoaderCircle
          size={40}
          className="animate-spin text-blue-600 stroke-[2]"
        />
        <p className="text-sm font-medium text-slate-500">
          Compiling practice metrics...
        </p>
      </div>
    );
  }

  // Base Fallback for default structural values
  const data = stats || {
    appointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    medicalRecords: 0,
    earnings: "0.00",
  };

  // Card UI mapping matrix configuration
  const structuralCards = [
    {
      title: "Total Appointments",
      value: data.appointments,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50/70 border-blue-100",
    },
    {
      title: "Pending Approval",
      value: data.pendingAppointments,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50/70 border-amber-100",
    },
    {
      title: "Approved Sessions",
      value: data.approvedAppointments,
      icon: Activity,
      color: "text-indigo-600",
      bg: "bg-indigo-50/70 border-indigo-100",
    },
    {
      title: "Completed Visits",
      value: data.completedAppointments,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50/70 border-emerald-100",
    },
    {
      title: "Cancelled Schedules",
      value: data.cancelledAppointments,
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50/70 border-rose-100",
    },
    {
      title: "Medical Records File",
      value: data.medicalRecords,
      icon: FileText,
      color: "text-slate-600",
      bg: "bg-slate-50/70 border-slate-200/60",
    },
  ];

  return (
    <div className="bg-slate-50/40 min-h-screen py-8 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              {getTimeBasedGreeting()}, Doctor
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Here is an overview of your practice activities, clinical data,
              and consolidated schedules.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 transition disabled:opacity-60"
          >
            <RefreshCw
              size={15}
              className={`${loading ? "animate-spin" : ""} text-slate-500`}
            />
            <span>Sync Data</span>
          </button>
        </div>

        {/* Highlight Focus Grid: Financial Earnings Overview Card */}
        <div className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800">
            {/* Background geometric flare decoration for premium visual layout */}
            <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Total Performance Gross
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-white pt-1">
                  $
                  {parseFloat(data.earnings).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h2>
                <p className="text-xs text-slate-400 pt-1">
                  Consolidated billing and consultation revenue
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
                <DollarSign size={24} className="stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Breakdown Label */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Clinical Operational Metrics
          </h3>
        </div>

        {/* Core Multi-Grid Stats Panels Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {structuralCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-500 tracking-normal block">
                    {card.title}
                  </span>
                  <span className="text-2xl font-bold text-slate-900 tracking-tight block">
                    {data ? card.value : "—"}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-xl border ${card.bg} ${card.color} transition-colors duration-200`}
                >
                  <IconComponent size={20} className="stroke-[2.5]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
