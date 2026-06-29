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
  statistics: null,

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Get Admin Dashboard                                                        */
/* -------------------------------------------------------------------------- */

export const getAdminDashboard = createAsyncThunk(
  "dashboard/getAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/admin");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch admin dashboard"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Doctor Dashboard                                                       */
/* -------------------------------------------------------------------------- */

export const getDoctorDashboard = createAsyncThunk(
  "dashboard/getDoctorDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/doctor");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch doctor dashboard"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Patient Dashboard                                                      */
/* -------------------------------------------------------------------------- */

export const getPatientDashboard = createAsyncThunk(
  "dashboard/getPatientDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/patient");

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to fetch patient dashboard"),
      );
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Dashboard Slice                                                            */
/* -------------------------------------------------------------------------- */

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },

    clearDashboardMessage: (state) => {
      state.message = null;
    },

    clearDashboardStatistics: (state) => {
      state.statistics = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Get Admin Dashboard                                                    */
      /* ---------------------------------------------------------------------- */

      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.statistics = action.payload.statistics;

        state.message = action.payload.message;
      })

      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Doctor Dashboard                                                   */
      /* ---------------------------------------------------------------------- */

      .addCase(getDoctorDashboard.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(getDoctorDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.statistics = action.payload.statistics;

        state.message = action.payload.message;
      })

      .addCase(getDoctorDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Patient Dashboard                                                  */
      /* ---------------------------------------------------------------------- */

      .addCase(getPatientDashboard.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(getPatientDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.statistics = action.payload.statistics;

        state.message = action.payload.message;
      })

      .addCase(getPatientDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const {
  clearDashboardError,
  clearDashboardMessage,
  clearDashboardStatistics,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectDashboardStatistics = (state) => state.dashboard.statistics;

export const selectDashboardLoading = (state) => state.dashboard.loading;

export const selectDashboardError = (state) => state.dashboard.error;

export const selectDashboardMessage = (state) => state.dashboard.message;
