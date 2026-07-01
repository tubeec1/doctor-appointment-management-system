import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getDoctorSchedules,
  clearScheduleError,
  clearScheduleMessage,
  selectSchedules,
  selectScheduleLoading,
  selectScheduleError,
  selectScheduleMessage,
} from "../../features/schedules/scheduleSlice";
import { getDoctors, selectDoctors } from "../../features/doctors/doctorSlice";
import {
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  X,
  User,
  Filter,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

const Schedules = () => {
  const dispatch = useDispatch();

  // Redux Store Selectors
  const schedules = useSelector(selectSchedules) || [];
  const doctors = useSelector(selectDoctors) || [];
  const globalLoading = useSelector(selectScheduleLoading);
  const error = useSelector(selectScheduleError);
  const message = useSelector(selectScheduleMessage);

  // Filter, Modal & Form Context States
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editScheduleId, setEditScheduleId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formState, setFormState] = useState({
    doctorId: "",
    dayOfWeek: "Monday",
    startTime: "",
    endTime: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Core Data Lifecycle Sync
  useEffect(() => {
    dispatch(getSchedules());
    dispatch(getDoctors());
  }, [dispatch]);

  // Isolate Filter Streams
  useEffect(() => {
    if (selectedDoctorFilter) {
      dispatch(getDoctorSchedules(selectedDoctorFilter));
    } else {
      dispatch(getSchedules());
    }
  }, [selectedDoctorFilter, dispatch]);

  // Global Alert Display Cleanup Timers
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearScheduleError()), 5000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => dispatch(clearScheduleMessage()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);

  // Modal State Control Functions
  const handleOpenCreate = () => {
    setEditScheduleId(null);
    setFormState({
      doctorId: selectedDoctorFilter || "",
      dayOfWeek: "Monday",
      startTime: "",
      endTime: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sched) => {
    setEditScheduleId(sched.id);
    setFormState({
      doctorId: sched.doctorId || sched.doctor_id || "",
      dayOfWeek: sched.dayOfWeek || sched.day_of_week || "Monday",
      startTime: sched.startTime || sched.start_time || "",
      endTime: sched.endTime || sched.end_time || "",
    });
    setIsModalOpen(true);
  };

  // Safe Deletion Wrapper with window.confirm check
  const handleDeleteExecute = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule slot? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await dispatch(deleteSchedule(id)).unwrap();
    } catch (err) {
      // Handled via standard schedule slice catchers
    } finally {
      setDeletingId(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Data Persistence Dispatch Actions
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      doctorId: Number(formState.doctorId),
      dayOfWeek: formState.dayOfWeek,
      startTime: formState.startTime,
      endTime: formState.endTime,
    };

    if (!payload.doctorId) return;

    if (editScheduleId) {
      dispatch(
        updateSchedule({ scheduleId: editScheduleId, scheduleData: payload }),
      ).then((res) => {
        if (!res.error) {
          setIsModalOpen(false);
          dispatch(getSchedules());
        }
      });
    } else {
      dispatch(createSchedule(payload)).then((res) => {
        if (!res.error) {
          setIsModalOpen(false);
          dispatch(getSchedules());
        }
      });
    }
  };

  // Local Array Meta Resolver
  const getDoctorMeta = (targetId) => {
    const found = doctors.find((d) => String(d.id) === String(targetId));
    return found
      ? `Dr. ${found.fullName || found.full_name}`
      : "Assigned Practitioner";
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800 space-y-8 relative font-sans antialiased">
      {/* FIXED TOAST NOTIFICATION STACK */}
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none max-w-sm w-full">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl shadow-xl flex items-start gap-3 pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={16} />
            <div className="text-xs font-bold leading-relaxed">{error}</div>
          </div>
        )}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl shadow-xl flex items-start gap-3 pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2
              className="text-emerald-600 shrink-0 mt-0.5"
              size={16}
            />
            <div className="text-xs font-bold leading-relaxed">{message}</div>
          </div>
        )}
      </div>

      {/* DASHBOARD CONSOLE ROW HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Clinical Duty Rosters
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Design availability tracks, manage shifts, and monitor systemic
            hours configurations.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 active:scale-95 transition-all duration-200"
        >
          <Plus size={15} />
          Create Allocation Entry
        </button>
      </div>

      {/* SEARCH AND CONTROL CONTROL FILTERS ROW */}
      <div className="bg-white p-4 border border-slate-200/60 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3 w-full max-w-md bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <Filter className="text-slate-400 shrink-0" size={16} />
          <select
            value={selectedDoctorFilter}
            onChange={(e) => setSelectedDoctorFilter(e.target.value)}
            className="w-full text-xs font-bold text-slate-700 bg-transparent outline-none border-none cursor-pointer"
          >
            <option value="">Show All Registered Doctor Shifts</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Filter by: Dr. {doc.fullName || doc.full_name}
              </option>
            ))}
          </select>
        </div>

        {selectedDoctorFilter && (
          <button
            onClick={() => setSelectedDoctorFilter("")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-2 hover:bg-blue-50 rounded-lg transition-all"
          >
            <RefreshCw size={12} className="animate-hover" /> Clear Filter
          </button>
        )}
      </div>

      {/* SYSTEM MATRIX CONTAINER REGISTER */}
      {globalLoading && schedules.length === 0 ? (
        <div className="p-24 bg-white border border-slate-200/60 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-sm">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Recompiling Allocation Timelines...
          </p>
        </div>
      ) : schedules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((item) => {
            const activeDocId = item.doctorId || item.doctor_id;
            const activeDay = item.dayOfWeek || item.day_of_week;
            const startStr = item.startTime || item.start_time;
            const endStr = item.endTime || item.end_time;
            const docRefMeta = item.Doctor || item.doctor;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col gap-4 relative group"
              >
                {/* Information Header Grid Segment */}
                <div className="flex items-start gap-3.5 pr-14">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 group-hover:bg-blue-100/70 transition-colors">
                    <User size={16} />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-black text-slate-900 truncate">
                      {docRefMeta
                        ? `Dr. ${docRefMeta.fullName || docRefMeta.full_name}`
                        : item.doctor_name
                          ? `Dr. ${item.doctor_name}`
                          : getDoctorMeta(activeDocId)}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={11} /> {activeDay}
                    </p>
                    {item.specialization && (
                      <span className="inline-block bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded text-[10px]">
                        {item.specialization}
                      </span>
                    )}
                  </div>
                </div>

                {/* Floating Interactive Micro Controls */}
                <div className="absolute top-5 right-5 flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    disabled={deletingId === item.id}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition disabled:opacity-50"
                    title="Modify Hours"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDeleteExecute(item.id)}
                    disabled={deletingId === item.id}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition disabled:opacity-50"
                    title="Purge Entry Slot"
                  >
                    {deletingId === item.id ? (
                      <Loader2
                        size={13}
                        className="animate-spin text-rose-600"
                      />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </div>

                {/* Unified Hour Layout Data Bar */}
                <div className="mt-auto flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-semibold text-slate-600">
                  <Clock size={13} className="text-blue-500" />
                  <div className="flex items-center gap-2">
                    <span className="bg-white px-2 py-0.5 border border-slate-200/60 rounded-md text-slate-800 font-bold shadow-sm">
                      {startStr}
                    </span>
                    <span className="text-slate-400 font-normal">to</span>
                    <span className="bg-white px-2 py-0.5 border border-slate-200/60 rounded-md text-slate-800 font-bold shadow-sm">
                      {endStr}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-16 bg-white rounded-2xl border border-dashed border-slate-300 shadow-inner">
          <Calendar size={36} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-400">
            No active operational shift blocks mapped within the database
            registry rows.
          </p>
        </div>
      )}

      {/* COMPONENT POPUP FORM MODAL CONTAINER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header Identity Row */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                {editScheduleId
                  ? "Modify Duty Frame Configurations"
                  : "Map New Roster Allocation Block"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition"
              >
                <X size={15} />
              </button>
            </div>

            {/* Input Roster Payload Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Medical Officer Target
                </label>
                <select
                  name="doctorId"
                  required
                  value={formState.doctorId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-bold text-slate-700 bg-white transition"
                >
                  <option value="">
                    -- Select Active Practitioner Reference --
                  </option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      Dr. {doc.fullName || doc.full_name} (
                      {doc.specialization || "General Block"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Target Operational Day
                </label>
                <select
                  name="dayOfWeek"
                  value={formState.dayOfWeek}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-bold text-slate-700 bg-white transition"
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Conversion Layout Split Rows */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Shift Commencement
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    required
                    value={formState.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-bold text-slate-700 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Shift Completion
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    required
                    value={formState.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-bold text-slate-700 transition"
                  />
                </div>
              </div>

              {/* Operations Panel Bottom Bar Controls */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={globalLoading}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
                >
                  {globalLoading && (
                    <Loader2 size={12} className="animate-spin" />
                  )}
                  {editScheduleId ? "Commit Updates" : "Publish Roster"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;
