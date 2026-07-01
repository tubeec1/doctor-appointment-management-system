import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  assignDoctor,
  getDepartmentDoctors,
  removeDoctor,
  clearDepartmentError,
  clearDepartmentMessage,
  selectDepartments,
  selectDepartmentDoctors,
  selectDepartmentLoading,
  selectDepartmentError,
  selectDepartmentMessage,
} from "../../features/departments/departmentSlice";
import { getDoctors, selectDoctors } from "../../features/doctors/doctorSlice";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  UserMinus,
  X,
  Folder,
  FileText,
  Users,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

const Departments = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const departments = useSelector(selectDepartments) || [];
  const assignedDoctors = useSelector(selectDepartmentDoctors) || [];
  const allDoctors = useSelector(selectDoctors) || [];
  const loading = useSelector(selectDepartmentLoading);
  const error = useSelector(selectDepartmentError);
  const message = useSelector(selectDepartmentMessage);

  // Focus Context States
  const [selectedDeptId, setSelectedDeptId] = useState(null);

  // Modal Visibility Controls
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Mutation Operations State Targets
  const [editDeptId, setEditDeptId] = useState(null);

  // Local Controlled Forms State Stores
  const [deptForm, setDeptForm] = useState({ name: "", description: "" });
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  // Sync core directory arrays upon mount execution
  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getDoctors()); // Pulled to cleanly seed options inside doctor allocation controls
  }, [dispatch]);

  // Handle side-effect doctor collection arrays when focused department switches
  useEffect(() => {
    if (selectedDeptId) {
      dispatch(getDepartmentDoctors(selectedDeptId));
    }
  }, [dispatch, selectedDeptId]);

  // Automated layout notifications clear-down sequences
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearDepartmentError()), 5000);
      return () => clearTimeout(timer);
    }
    if (message) {
      const timer = setTimeout(() => dispatch(clearDepartmentMessage()), 4000);
      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);

  // Modal Launcher Utilities
  const handleOpenCreate = () => {
    setEditDeptId(null);
    setDeptForm({ name: "", description: "" });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (dept, e) => {
    e.stopPropagation(); // Stop parent click events from triggering row focus selection updates
    setEditDeptId(dept.id);
    setDeptForm({ name: dept.name || "", description: dept.description || "" });
    setIsFormModalOpen(true);
  };

  const handleOpenAssign = (dept, e) => {
    e.stopPropagation();
    setSelectedDeptId(dept.id);
    setSelectedDoctorId("");
    setIsAssignModalOpen(true);
  };

  // Destructive Actions Handlers
  const handleDeleteDept = (id, name, e) => {
    e.stopPropagation();
    if (
      window.confirm(
        `Are you absolutely sure you want to delete the "${name}" department? This action cannot be undone.`,
      )
    ) {
      dispatch(deleteDepartment(id)).then(() => {
        if (selectedDeptId === id) setSelectedDeptId(null);
      });
    }
  };

  const handleEvictDoctor = (assignmentId, doctorName) => {
    if (
      window.confirm(
        `Remove Dr. ${doctorName} from this department allocation layout?`,
      )
    ) {
      dispatch(removeDoctor(assignmentId)).then(() => {
        if (selectedDeptId) dispatch(getDepartmentDoctors(selectedDeptId));
      });
    }
  };

  // Form Submission Dispatches
  const handleDeptSubmit = (e) => {
    e.preventDefault();
    if (editDeptId) {
      dispatch(
        updateDepartment({
          departmentId: editDeptId,
          departmentData: deptForm,
        }),
      ).then((res) => {
        if (!res.error) setIsFormModalOpen(false);
      });
    } else {
      dispatch(createDepartment(deptForm)).then((res) => {
        if (!res.error) setIsFormModalOpen(false);
      });
    }
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctorId) return;
    dispatch(
      assignDoctor({
        doctorId: selectedDoctorId,
        departmentId: selectedDeptId,
      }),
    ).then((res) => {
      if (!res.error) {
        setIsAssignModalOpen(false);
        dispatch(getDepartmentDoctors(selectedDeptId)); // Force layout stream data refresh sync
      }
    });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800 space-y-8 relative">
      {/* GLOBAL DISCREET ACTION FEEDBACK FLOATING PANELS */}
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none max-w-sm w-full">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl shadow-xl flex items-start gap-3 pointer-events-auto animate-slide-in">
            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={16} />
            <div className="text-xs font-bold">{error}</div>
          </div>
        )}
        {message && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl shadow-xl flex items-start gap-3 pointer-events-auto animate-slide-in">
            <CheckCircle2
              className="text-emerald-600 shrink-0 mt-0.5"
              size={16}
            />
            <div className="text-xs font-bold">{message}</div>
          </div>
        )}
      </div>

      {/* CORE TOPBAR ARCHITECTURE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Clinical Departments Engine
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Configure clinic wings, map core medical operational clusters, and
            allocate specialized staff.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 transition"
        >
          <Plus size={15} />
          Establish New Wing
        </button>
      </div>

      {/* SPLIT MASTER-DETAIL CONTROL COMPONENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN PANEL: MEDICAL WINGS SYSTEM DIRECTORY INDEXES (2/3 Width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers size={14} className="text-blue-600" /> Active
                Operational Divisions
              </h2>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {departments.length} Sub-systems
              </span>
            </div>

            {loading && departments.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-7 w-7 text-blue-600 animate-spin" />
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Querying System Trees...
                </p>
              </div>
            ) : departments.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {departments.map((dept) => {
                  const isSelected = selectedDeptId === dept.id;
                  return (
                    <div
                      key={dept.id}
                      onClick={() => setSelectedDeptId(dept.id)}
                      className={`p-5 flex items-start justify-between gap-4 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-50/40 border-l-4 border-blue-600 pl-4"
                          : "hover:bg-slate-50/60 pl-5 border-l-4 border-transparent"
                      }`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition">
                            {dept.name}
                          </h3>
                          <ChevronRight
                            size={12}
                            className={`text-slate-300 transition-transform ${isSelected ? "transform rotate-90 text-blue-500" : ""}`}
                          />
                        </div>
                        <p className="text-xs font-medium text-slate-500 line-clamp-2 max-w-xl">
                          {dept.description ||
                            "No description matrix configured for this cluster group."}
                        </p>
                      </div>

                      {/* Explicit Interactive Action Strips */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => handleOpenAssign(dept, e)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition shadow-none hover:shadow-sm"
                          title="Deploy Staff Allocation"
                        >
                          <UserPlus size={14} />
                        </button>
                        <button
                          onClick={(e) => handleOpenEdit(dept, e)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition shadow-none hover:shadow-sm"
                          title="Edit Blueprint Configurations"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={(e) =>
                            handleDeleteDept(dept.id, dept.name, e)
                          }
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition shadow-none hover:shadow-sm"
                          title="Decommission Division Cluster"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-12 text-slate-400">
                <Folder className="mx-auto text-slate-300 mb-2" size={28} />
                <p className="text-xs font-medium">
                  No system wings identified inside core dataset maps.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN PANEL: DYNAMIC LIVE DEPLOYED PRACTITIONERS MONITOR CARD (1/3 Width) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden sticky top-8">
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Users size={14} className="text-emerald-600" /> Attached
                Medical Officers
              </h2>
            </div>

            {selectedDeptId ? (
              <div className="p-6 space-y-4">
                {loading && assignedDoctors.length === 0 ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                  </div>
                ) : assignedDoctors.length > 0 ? (
                  <div className="space-y-2.5">
                    {assignedDoctors.map((docMapping) => {
                      // Adapt to matching payload schemas safely
                      const doctorObj = docMapping.Doctor || docMapping;
                      const mappingIdentifier = docMapping.id || doctorObj.id;

                      return (
                        <div
                          key={mappingIdentifier}
                          className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/50 rounded-xl group transition hover:bg-white hover:border-slate-200"
                        >
                          <div className="min-w-0 flex-1 pr-3">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              Dr.{" "}
                              {doctorObj.fullName ||
                                doctorObj.full_name ||
                                "Practitioner"}
                            </h4>
                            <p className="text-[11px] font-medium text-slate-400 truncate">
                              {doctorObj.specialization || "Domain Field"}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleEvictDoctor(
                                mappingIdentifier,
                                doctorObj.fullName || doctorObj.full_name,
                              )
                            }
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-80 group-hover:opacity-100 transition"
                            title="Evict from Wing Assignment"
                          >
                            <UserMinus size={13} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 space-y-2">
                    <ShieldAlert size={20} className="mx-auto text-slate-300" />
                    <p className="text-xs font-medium">
                      No medical assets allocated to this branch file node.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 font-medium text-xs">
                Select an operational division sector from the registry matrix
                to cross-audit deployed medical teams.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL WINDOW SYSTEM COMPONENT 1: COMPOSITION AND EDIT BLUEPRINTS WING MATRIX */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">
                {editDeptId
                  ? "Alter System Wing Attributes"
                  : "Map New Corporate Medical Sector"}
              </h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleDeptSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">
                  Division Functional Identifier Title Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Pediatrics Department, Emergency Core"
                  value={deptForm.name}
                  onChange={(e) =>
                    setDeptForm({ ...deptForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-slate-800 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">
                  Functional Descriptions and Audit Parameters
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Elaborate regarding clinical duties, scope of treatment fields, or institutional wing locations..."
                  value={deptForm.description}
                  onChange={(e) =>
                    setDeptForm({ ...deptForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-slate-800 transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 transition"
                >
                  {loading && <Loader2 size={12} className="animate-spin" />}
                  {editDeptId ? "Commit Changes" : "Deploy Blueprint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL WINDOW SYSTEM COMPONENT 2: DISPATCH AND ATTACH RECRUIT PRACTITIONER VECTOR */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">
                Deploy Staff Allocation
              </h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition"
              >
                <X size={15} />
              </button>
            </div>

            <form
              onSubmit={handleAssignSubmit}
              className="p-6 space-y-4 text-xs"
            >
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">
                  Target Officer Account Registry
                </label>
                <select
                  required
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-bold text-slate-700 bg-white transition"
                >
                  <option value="">
                    -- Choose practitioner from directory ledger --
                  </option>
                  {allDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      Dr. {doc.fullName || doc.full_name} (
                      {doc.specialization || "General Block"})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 font-medium">
                  This writes direct foreign key references linking the
                  practitioner tracking data schema token directly onto this
                  departmental node frame.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !selectedDoctorId}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 transition disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading && <Loader2 size={12} className="animate-spin" />}
                  Confirm Deployment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
