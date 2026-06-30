import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FileText,
  Search,
  Eye,
  Calendar,
  User,
  Activity,
  Pill,
  StickyNote,
  Clock,
  X,
  LoaderCircle,
  Inbox,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  getMyMedicalRecords,
  clearMedicalRecordError,
  clearMedicalRecordMessage,
  selectMyMedicalRecords,
  selectMedicalRecordLoading,
  selectMedicalRecordError,
  selectMedicalRecordMessage,
} from "../../features/medicalRecords/medicalRecordSlice";

const MyMedicalRecords = () => {
  const dispatch = useDispatch();

  // Redux Slice State Elements
  const records = useSelector(selectMyMedicalRecords) || [];
  const loading = useSelector(selectMedicalRecordLoading);
  const error = useSelector(selectMedicalRecordError);
  const message = useSelector(selectMedicalRecordMessage);

  // Search filter and selected modal item tracking states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Fetch patient baseline data matrix on component mount
  useEffect(() => {
    dispatch(getMyMedicalRecords());
  }, [dispatch]);

  // Toast Messaging Notification listeners
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMedicalRecordError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMedicalRecordMessage());
    }
  }, [message, dispatch]);

  // Inline filter execution parsing diagnosis keys
  const filteredRecords = records.filter((item) =>
    item?.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* ================= HERO TITLE BANNER ================= */}
      <section className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                <FileText className="h-9 w-9 text-cyan-200" />
                My Medical History Records
              </h1>
              <p className="mt-2 text-cyan-100 max-w-xl text-sm">
                Review verified clinical diagnoses, diagnostic assessments,
                active pharmacy prescriptions, and continuous historical
                checkups issued by your attending physicians.
              </p>
            </div>

            {/* Search Input Filter block */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder-cyan-200 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition shadow-inner"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT MAIN SECTION ================= */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        {loading && records.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <LoaderCircle className="h-12 w-12 text-teal-600 animate-spin" />
            <p className="mt-4 text-sm font-medium">
              Synchronizing medical charts...
            </p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center max-w-xl mx-auto mt-12">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Inbox className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No Medical Charts Found
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              {searchTerm
                ? "No metrics matched your active text search parameters. Try verifying terms syntax layout."
                : "You don't have any diagnostic medical charts cataloged to your patient account file yet."}
            </p>
          </div>
        ) : (
          /* Responsive Table Wrapper Layout Container */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-4 px-6">Record ID</th>
                    <th className="py-4 px-6">Appointment ID</th>
                    <th className="py-4 px-6">Diagnosis Chart</th>
                    <th className="py-4 px-6">Prescription Summary</th>
                    <th className="py-4 px-6">Logged Timeline</th>
                    <th className="py-4 px-6 text-right">Actions Matrix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-500">
                        #{record.id}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">
                        #{record.appointment_id || "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-xs border border-red-100/50">
                          {record.diagnosis}
                        </span>
                      </td>
                      <td className="py-4 px-6 max-w-xs truncate font-medium text-slate-600">
                        {record.prescription || "No medicine item assigned"}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {record.created_at
                            ? new Date(record.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )
                            : "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(record)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-teal-600 text-slate-700 hover:text-white px-3 py-2 rounded-lg transition shadow-sm"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Inspect Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ================= EXTENDED DETAILS INSPECTOR MODAL ================= */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col transform transition-all scale-100 animate-slide-up">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">
                  Clinical Examination Entry #{selectedRecord.id}
                </span>
                <h2 className="text-2xl font-bold mt-1 text-slate-100">
                  {selectedRecord.diagnosis}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body content matrix layout */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {/* Meta analytics row cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                  <Activity className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Linked Appointment
                    </p>
                    <p className="text-sm font-mono font-bold text-slate-800">
                      #{selectedRecord.appointment_id}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Date Finalized
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedRecord.created_at
                        ? new Date(selectedRecord.created_at).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prescription Items Entry Card */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Pill className="h-4 w-4 text-red-500" />
                  Pharmacy Prescription Details
                </h4>
                <div className="bg-red-50/40 rounded-xl p-4 border border-red-100/60 text-slate-800 font-medium whitespace-pre-line text-sm">
                  {selectedRecord.prescription ||
                    "No internal medications allocated to this log profile entry."}
                </div>
              </div>

              {/* Doctor's Notes Text Entry Card */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <StickyNote className="h-4 w-4 text-amber-500" />
                  Physician Diagnostic Clinical Notes
                </h4>
                <div className="bg-amber-50/30 rounded-xl p-4 border border-amber-100/60 text-slate-700 whitespace-pre-line text-sm leading-relaxed">
                  {selectedRecord.doctor_notes ||
                    "No supplementary clinical annotations left by the attending medical operator."}
                </div>
              </div>
            </div>

            {/* Modal Footer actions dismiss trigger */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition"
              >
                Close Summary View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMedicalRecords;
