import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminDashboard,
  selectDashboardStatistics,
  selectDashboardLoading,
  selectDashboardError,
} from "../../features/dashboard/dashboardSlice"; // Adjust path according to your structure
import {
  Users,
  Stethoscope,
  Building2,
  FileHeart,
  Activity,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectDashboardStatistics);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  // Loading State Spinner
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full gap-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-500">
          Compiling real-time medical matrices...
        </p>
      </div>
    );
  }

  // Error Alert Banner
  if (error) {
    return (
      <div className="p-6 m-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4">
        <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-rose-900">
            System Connection Sync Failed
          </h3>
          <p className="text-xs text-rose-700 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Guard clause against empty data state
  if (!statistics) return null;

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800 space-y-8">
      {/* 1. TOP GREETING HEADER PLATFORM */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Administrative Intelligence
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Operational Overview & Analytical Insights for DoctorCare Systems.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl shadow-sm text-xs font-bold text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Gateway Feed
        </div>
      </div>

      {/* 2. CORE SYSTEM ENTITY SCORES (Primary Metrics Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:border-blue-500/30 hover:shadow-md transition duration-200">
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Patients Registered
            </p>
            <h3 className="text-3xl font-black text-slate-900">
              {statistics.totalPatients}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition group-hover:bg-blue-600 group-hover:text-white">
            <Users size={22} />
          </div>
        </div>

        {/* Total Doctors */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:border-blue-500/30 hover:shadow-md transition duration-200">
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Medical Staff
            </p>
            <h3 className="text-3xl font-black text-slate-900">
              {statistics.totalDoctors}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center transition group-hover:bg-cyan-500 group-hover:text-white">
            <Stethoscope size={22} />
          </div>
        </div>

        {/* Total Departments */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:border-blue-500/30 hover:shadow-md transition duration-200">
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Departments
            </p>
            <h3 className="text-3xl font-black text-slate-900">
              {statistics.totalDepartments}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center transition group-hover:bg-indigo-600 group-hover:text-white">
            <Building2 size={22} />
          </div>
        </div>

        {/* Clinical Records */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:border-blue-500/30 hover:shadow-md transition duration-200">
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Compiled Case Records
            </p>
            <h3 className="text-3xl font-black text-slate-900">
              {statistics.totalMedicalRecords}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center transition group-hover:bg-purple-600 group-hover:text-white">
            <Activity size={22} />
          </div>
        </div>
      </div>

      {/* 3. APP SCHEDULER & FINANCE SECTION WRAPPERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Stack: Master Appointment Status Breakdown */}
        <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Appointment Master Distribution
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggregate breakdown of clinical visit requests.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100/50 rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 flex items-center gap-1.5">
              <FileHeart size={14} />
              {statistics.totalAppointments} Total Booked
            </div>
          </div>

          {/* Sub-status Progress Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Pending Case */}
            <div className="bg-amber-50/50 border border-amber-100/60 rounded-xl p-4 flex flex-col items-start gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock size={16} />
              </div>
              <div className="mt-1">
                <p className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">
                  Pending
                </p>
                <h4 className="text-xl font-black text-slate-900">
                  {statistics.pendingAppointments}
                </h4>
              </div>
            </div>

            {/* Approved Case */}
            <div className="bg-blue-50/50 border border-blue-100/60 rounded-xl p-4 flex flex-col items-start gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
              <div className="mt-1">
                <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                  Approved
                </p>
                <h4 className="text-xl font-black text-slate-900">
                  {statistics.approvedAppointments}
                </h4>
              </div>
            </div>

            {/* Completed Case */}
            <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-xl p-4 flex flex-col items-start gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
              <div className="mt-1">
                <p className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider">
                  Completed
                </p>
                <h4 className="text-xl font-black text-slate-900">
                  {statistics.completedAppointments}
                </h4>
              </div>
            </div>

            {/* Cancelled Case */}
            <div className="bg-rose-50/50 border border-rose-100/60 rounded-xl p-4 flex flex-col items-start gap-2">
              <div className="h-8 w-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle size={16} />
              </div>
              <div className="mt-1">
                <p className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider">
                  Cancelled
                </p>
                <h4 className="text-xl font-black text-slate-900">
                  {statistics.cancelledAppointments}
                </h4>
              </div>
            </div>
          </div>

          {/* Simple Visual Distribution Visualizer Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Dynamic Load Ratio</span>
              <span className="text-blue-600">Operational Balance</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden">
              <div
                style={{
                  width: `${(statistics.pendingAppointments / (statistics.totalAppointments || 1)) * 100}%`,
                }}
                className="h-full bg-amber-400 transition-all"
              />
              <div
                style={{
                  width: `${(statistics.approvedAppointments / (statistics.totalAppointments || 1)) * 100}%`,
                }}
                className="h-full bg-blue-500 transition-all"
              />
              <div
                style={{
                  width: `${(statistics.completedAppointments / (statistics.totalAppointments || 1)) * 100}%`,
                }}
                className="h-full bg-emerald-500 transition-all"
              />
              <div
                style={{
                  width: `${(statistics.cancelledAppointments / (statistics.totalAppointments || 1)) * 100}%`,
                }}
                className="h-full bg-rose-400 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Column Layout: Financial Ledger Ledger Board */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between text-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  Revenue Balance Sheets
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Billing flow and ledger processing.
                </p>
              </div>
              <div className="h-9 w-9 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 flex items-center justify-center">
                <DollarSign size={16} />
              </div>
            </div>

            {/* Premium Giant Gross Amount Box */}
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-1">
              <p className="text-[10px] font-extrabold text-blue-400 tracking-wider uppercase">
                Gross Realized Income
              </p>
              <h2 className="text-3xl font-black tracking-tight text-white">
                ${parseFloat(statistics.totalRevenue).toFixed(2)}
              </h2>
            </div>

            {/* Split Pending vs Realized Counters */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1 border-l-2 border-amber-500 pl-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Unresolved Invoices
                </p>
                <h4 className="text-base font-bold text-white">
                  {statistics.pendingPayments} Pending
                </h4>
              </div>
              <div className="space-y-1 border-l-2 border-emerald-500 pl-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Settled Settlements
                </p>
                <h4 className="text-base font-bold text-white">
                  {statistics.paidPayments} Fully Paid
                </h4>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Total Orders: {statistics.totalPayments}</span>
            <span className="text-cyan-400 font-bold">
              Billing Gateway Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
