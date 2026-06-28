import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* -------------------------------------------------------------------------- */
/* Helper Function                                                            */
/* -------------------------------------------------------------------------- */

const getError = (err, fallback) =>
  err?.response?.data?.message ||
  err?.response?.data?.errors?.[0]?.msg ||
  fallback;

/* -------------------------------------------------------------------------- */
/* Initial State                                                              */
/* -------------------------------------------------------------------------- */

const initialState = {
  departments: [],

  department: null,

  departmentDoctors: [],

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Get All Departments                                                        */
/* -------------------------------------------------------------------------- */

export const getDepartments = createAsyncThunk(
  "department/getDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/departments");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch departments"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Department By ID                                                       */
/* -------------------------------------------------------------------------- */

export const getDepartmentById = createAsyncThunk(
  "department/getDepartmentById",
  async (departmentId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/departments/${departmentId}`);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch department"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Create Department                                                          */
/* -------------------------------------------------------------------------- */

export const createDepartment = createAsyncThunk(
  "department/createDepartment",
  async (departmentData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/departments", departmentData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to create department"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Update Department                                                          */
/* -------------------------------------------------------------------------- */

export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async ({ departmentId, departmentData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/departments/${departmentId}`,
        departmentData,
      );

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to update department"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Delete Department                                                          */
/* -------------------------------------------------------------------------- */

export const deleteDepartment = createAsyncThunk(
  "department/deleteDepartment",
  async (departmentId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/departments/${departmentId}`);

      return {
        ...data,
        departmentId,
      };
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to delete department"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Assign Doctor To Department                                                */
/* -------------------------------------------------------------------------- */

export const assignDoctor = createAsyncThunk(
  "department/assignDoctor",
  async (assignData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/departments/assign-doctor", assignData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to assign doctor"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Department Doctors                                                     */
/* -------------------------------------------------------------------------- */

export const getDepartmentDoctors = createAsyncThunk(
  "department/getDepartmentDoctors",
  async (departmentId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/departments/${departmentId}/doctors`);

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to fetch department doctors"),
      );
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Remove Doctor From Department                                              */
/* -------------------------------------------------------------------------- */

export const removeDoctor = createAsyncThunk(
  "department/removeDoctor",
  async (assignmentId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(
        `/departments/remove-doctor/${assignmentId}`,
      );

      return {
        ...data,
        assignmentId,
      };
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to remove doctor from department"),
      );
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Department Slice                                                           */
/* -------------------------------------------------------------------------- */

const departmentSlice = createSlice({
  name: "department",

  initialState,

  reducers: {
    clearDepartmentError: (state) => {
      state.error = null;
    },

    clearDepartmentMessage: (state) => {
      state.message = null;
    },

    clearSelectedDepartment: (state) => {
      state.department = null;
    },

    clearDepartmentDoctors: (state) => {
      state.departmentDoctors = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Get Departments                                                        */
      /* ---------------------------------------------------------------------- */

      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.departments;
      })

      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Department By ID                                                   */
      /* ---------------------------------------------------------------------- */

      .addCase(getDepartmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDepartmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload.department;
      })

      .addCase(getDepartmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Create Department                                                      */
      /* ---------------------------------------------------------------------- */

      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;

        state.departments.unshift(action.payload.department);

        state.message = action.payload.message;
      })

      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Update Department                                                      */
      /* ---------------------------------------------------------------------- */

      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;

        state.department = action.payload.department;

        state.departments = state.departments.map((department) =>
          department.id === action.payload.department.id
            ? action.payload.department
            : department,
        );

        state.message = action.payload.message;
      })

      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* ---------------------------------------------------------------------- */
      /* Delete Department                                                      */
      /* ---------------------------------------------------------------------- */

      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;

        state.departments = state.departments.filter(
          (department) => department.id !== action.payload.departmentId,
        );

        state.message = action.payload.message;
      })

      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Assign Doctor                                                          */
      /* ---------------------------------------------------------------------- */

      .addCase(assignDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(assignDoctor.fulfilled, (state, action) => {
        state.loading = false;

        state.departmentDoctors = action.payload.doctors;

        state.message = action.payload.message;
      })

      .addCase(assignDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Department Doctors                                                     */
      /* ---------------------------------------------------------------------- */

      .addCase(getDepartmentDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDepartmentDoctors.fulfilled, (state, action) => {
        state.loading = false;

        state.departmentDoctors = action.payload.doctors;
      })

      .addCase(getDepartmentDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Remove Doctor                                                          */
      /* ---------------------------------------------------------------------- */

      .addCase(removeDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeDoctor.fulfilled, (state, action) => {
        state.loading = false;

        state.departmentDoctors = [];

        state.message = action.payload.message;
      })

      .addCase(removeDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const {
  clearDepartmentError,
  clearDepartmentMessage,
  clearSelectedDepartment,
  clearDepartmentDoctors,
} = departmentSlice.actions;

export default departmentSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectDepartments = (state) => state.department.departments;

export const selectDepartment = (state) => state.department.department;

export const selectDepartmentDoctors = (state) =>
  state.department.departmentDoctors;

export const selectDepartmentLoading = (state) => state.department.loading;

export const selectDepartmentError = (state) => state.department.error;

export const selectDepartmentMessage = (state) => state.department.message;
