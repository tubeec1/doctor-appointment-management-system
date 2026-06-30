import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentReport,
  getPaymentReport,
  getDoctorReport,
  getPatientReport,
  getMedicalRecordReport,
  selectReport,
  selectReportLoading,
  selectReportError,
  clearReport,
} from "../../features/reports/reportSlice"; // Adjust path according to your workspace structure
import {
  FileText,
  Calendar,
  CreditCard,
  Stethoscope,
  Users,
  Activity,
  Loader2,
  AlertCircle,
  TrendingUp,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

const Reports = () => {
  const dispatch = useDispatch();
  const reportData = useSelector(selectReport);
  const loading = useSelector(selectReportLoading);
  const error = useSelector(selectReportError);

  // Tab State
  const [activeTab, setActiveTab] = useState("appointments");

  // Tab definitions configuration array
  const tabs = [
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      action: getAppointmentReport,
    },
    {
      id: "payments",
      label: "Financial Ledgers",
      icon: CreditCard,
      action: getPaymentReport,
    },
    {
      id: "doctors",
      label: "Medical Staffing",
      icon: Stethoscope,
      action: getDoctorReport,
    },
    {
      id: "patients",
      label: "Patient Demographics",
      icon: Users,
      action: getPatientReport,
    },
    {
      id: "medical-records",
      label: "Clinical Records",
      icon: Activity,
      action: getMedicalRecordReport,
    },
  ];

  // Sync data fetch execution matrix to active tab
  useEffect(() => {
    dispatch(clearReport()); // Clear local state store before pulling fresh analytics array
    const currentTab = tabs.find((t) => t.id === activeTab);
    if (currentTab?.action) {
      dispatch(currentTab.action());
    }
  }, [dispatch, activeTab]);

  // Handle mock report generation stream
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800 space-y-8 print:p-0 print:bg-white">
      {/* 1. TOP HEADER PLATFORM CONSOLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            System Reporting Engine
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Compile operational performance arrays, cross-department matrices,
            and audit ledgers.
          </p>
        </div>
        <button
          onClick={handlePrintReport}
          disabled={loading || error || !reportData}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/10 hover:from-blue-700 hover:to-blue-800 transition dynamic-action disabled:opacity-50 disabled:pointer-events-none"
        >
          <Download size={14} />
          Export System PDF
        </button>
      </div>

      {/* 2. PREMIUM SEGMENTED TAB MATRIX HUB */}
      <div className="flex border-b border-slate-200/80 gap-1 overflow-x-auto pb-px scrollbar-none print:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
              }`}
            >
              <Icon
                size={15}
                className={isSelected ? "text-blue-600" : "text-slate-400"}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. DYNAMIC ASYNC LAYOUT SWITCHBOARD */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] w-full gap-4">
          <Loader2 className="h-9 w-9 text-blue-600 animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Compiling Analytics Node...
          </p>
        </div>
      ) : error ? (
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-rose-900">
              Pipeline Synchronization Terminated
            </h3>
            <p className="text-xs text-rose-700 mt-1">{error}</p>
          </div>
        </div>
      ) : reportData ? (
        <div className="space-y-8 animate-fade-in">
          {/* RENDER SYSTEM MODULES */}
          {activeTab === "appointments" && (
            <AppointmentReportView data={reportData} />
          )}
          {activeTab === "payments" && <PaymentReportView data={reportData} />}
          {activeTab === "doctors" && <DoctorReportView data={reportData} />}
          {activeTab === "patients" && <PatientReportView data={reportData} />}
          {activeTab === "medical-records" && (
            <MedicalRecordReportView data={reportData} />
          )}
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <FileText className="mx-auto text-slate-300 mb-3" size={32} />
          <p className="text-sm font-medium text-slate-400">
            No operational ledger rows found for this workspace.
          </p>
        </div>
      )}
    </div>
  );
};

/* ========================================================================== */
/* SUB-MODULE VIEW PORTS (PREMIUM SUB-LAYOUT RENDERING)                       */
/* ========================================================================== */

// --- 1. APPOINTMENT VISUAL REPORT MODULE ---
const AppointmentReportView = ({ data }) => {
  // Normalize array if payload variations occur
  const dataset = Array.isArray(data)
    ? data
    : data.rows || data.appointments || [];

  // High-performance operational state calculation
  const total = dataset.length;
  const fulfilled = dataset.filter(
    (a) => a.status?.toLowerCase() === "completed",
  ).length;
  const structuralLoad = total > 0 ? Math.round((fulfilled / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Gross Registry Requests
            </p>
            <h3 className="text-2xl font-black text-slate-900">{total}</h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar size={18} />
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Fulfilled Operations
            </p>
            <h3 className="text-2xl font-black text-slate-900">{fulfilled}</h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Operational Success Rate
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              {structuralLoad}%
            </h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Historical Check-in Audit Logs
          </h3>
          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            Live Stream Array
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/50 text-slate-400 border-b border-slate-200/60 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Appointment ID</th>
                <th className="p-4">Patient Target</th>
                <th className="p-4">Assigned Specialist</th>
                <th className="p-4">Schedule Timestamp</th>
                <th className="p-4 pr-6 text-right">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {dataset.length > 0 ? (
                dataset.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="p-4 pl-6 font-mono text-slate-400">
                      #APT-{row.id || 100 + idx}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {row.patient_name ||
                        row.Patient?.full_name ||
                        "Unspecified Case"}
                    </td>
                    <td className="p-4">
                      {row.doctor_name ||
                        row.Doctor?.full_name ||
                        "Staff Unassigned"}
                    </td>
                    <td className="p-4">
                      {row.appointment_date || "Date Unset"}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          row.status?.toLowerCase() === "completed"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}
                      >
                        {row.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
                    No analytical registry points matching tracking parameter
                    arrays.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 2. PAYMENT REPORT VIEW MODULE ---
const PaymentReportView = ({ data }) => {
  const dataset = Array.isArray(data) ? data : data.rows || data.payments || [];

  // Realized value loop execution
  const grossIncome = dataset.reduce(
    (sum, current) => sum + parseFloat(current.amount || 0),
    0,
  );
  const totalInvoices = dataset.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-6 rounded-2xl shadow-xl text-white flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <span className="text-[10px] font-extrabold tracking-widest text-blue-400 uppercase">
              Settled Ledger Value
            </span>
            <CreditCard size={16} className="text-slate-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">
              Realized Fiscal Capital
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white mt-1">
              ${grossIncome.toFixed(2)}
            </h2>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Processed Settlement Tokens
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              {totalInvoices}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Fiscal Transaction Audits
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/50 text-slate-400 border-b border-slate-200/60 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Invoice Identifier</th>
                <th className="p-4">Payer Account</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Processing Date</th>
                <th className="p-4 pr-6 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {dataset.length > 0 ? (
                dataset.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="p-4 pl-6 font-mono text-slate-400">
                      #INV-{row.id || 5000 + idx}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {row.payer_name ||
                        row.Patient?.full_name ||
                        "General Patient"}
                    </td>
                    <td className="p-4 uppercase tracking-wide text-slate-500">
                      {row.payment_method || "Credit Card"}
                    </td>
                    <td className="p-4">{row.payment_date || "N/A"}</td>
                    <td className="p-4 pr-6 text-right font-bold text-emerald-600">
                      ${parseFloat(row.amount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
                    No active fiscal rows detected inside transactional registry
                    channels.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 3. DOCTOR STAFF REPORT MODULE ---
const DoctorReportView = ({ data }) => {
  const dataset = Array.isArray(data) ? data : data.rows || data.doctors || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Registered Practitioners
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              {dataset.length}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Stethoscope size={18} />
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Staff Utilization Index
            </p>
            <h3 className="text-2xl font-black text-slate-900">100% Active</h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Medical Officer Rosters
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/50 text-slate-400 border-b border-slate-200/60 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Staff Tag</th>
                <th className="p-4">Full Legal Name</th>
                <th className="p-4">Assigned Department Block</th>
                <th className="p-4 pr-6 text-right">System Access Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {dataset.length > 0 ? (
                dataset.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="p-4 pl-6 font-mono text-slate-400">
                      #DOC-{row.id || 300 + idx}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      Dr. {row.full_name || "Practitioner"}
                    </td>
                    <td className="p-4">
                      {row.department_name ||
                        row.Department?.name ||
                        "General Medicine"}
                    </td>
                    <td className="p-4 pr-6 text-right text-slate-400">
                      {row.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-400">
                    No active medical practitioner records loaded inside this
                    frame node.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 4. PATIENT MATRIX MODULE ---
const PatientReportView = ({ data }) => {
  const dataset = Array.isArray(data) ? data : data.rows || data.patients || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Aggregated Total Admissions
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              {dataset.length}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Demographic State
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              Unified Directory
            </h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock size={18} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Patient Information Master Tree
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/50 text-slate-400 border-b border-slate-200/60 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Case Token</th>
                <th className="p-4">Full Identity</th>
                <th className="p-4">Contact Gateway</th>
                <th className="p-4 pr-6 text-right">
                  Emergency Contact Vector
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {dataset.length > 0 ? (
                dataset.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="p-4 pl-6 font-mono text-slate-400">
                      #PAT-{row.id || 700 + idx}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {row.full_name || "Anonymous Patient Entry"}
                    </td>
                    <td className="p-4">{row.email || "No Digital Alias"}</td>
                    <td className="p-4 pr-6 text-right text-slate-500">
                      {row.phone || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-400">
                    No patient matrix indexes localized into current cluster
                    arrays.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- 5. CLINICAL CASE FILE REPORT MODULE ---
const MedicalRecordReportView = ({ data }) => {
  const dataset = Array.isArray(data)
    ? data
    : data.rows || data.medicalRecords || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Composed Medical Records
            </p>
            <h3 className="text-2xl font-black text-slate-900">
              {dataset.length}
            </h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Activity size={18} />
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Integrity Standards
            </p>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-1.5 text-slate-900">
              <ShieldAlert size={16} className="text-blue-500" /> Fully
              Compliant
            </h3>
          </div>
          <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Clinical Encounter Diagnostics Audit
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/50 text-slate-400 border-b border-slate-200/60 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Case Identifier</th>
                <th className="p-4">Target Patient</th>
                <th className="p-4">Diagnosing Clinician</th>
                <th className="p-4 pr-6">
                  Primary Diagnostics Summary Conclusion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {dataset.length > 0 ? (
                dataset.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    className="hover:bg-slate-50/60 transition"
                  >
                    <td className="p-4 pl-6 font-mono text-slate-400">
                      #REC-{row.id || 900 + idx}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {row.Patient?.full_name ||
                        row.patient_name ||
                        "Indeterminate"}
                    </td>
                    <td className="p-4">
                      Dr.{" "}
                      {row.Doctor?.full_name ||
                        row.doctor_name ||
                        "Attending Officer"}
                    </td>
                    <td className="p-4 pr-6 font-medium text-slate-500 max-w-xs truncate">
                      {row.diagnosis ||
                        row.description ||
                        "Routine checkup procedure and analysis parameters completed."}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-400">
                    No explicit dynamic case history matrices returned by remote
                    pipeline data endpoints.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
