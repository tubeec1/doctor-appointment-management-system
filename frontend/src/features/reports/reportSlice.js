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
  report: null,

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Appointment Report                                                         */
/* -------------------------------------------------------------------------- */

export const getAppointmentReport = createAsyncThunk(
  "report/getAppointmentReport",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/reports/appointments");

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to fetch appointment report"),
      );
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Payment Report                                                             */
/* -------------------------------------------------------------------------- */

export const getPaymentReport = createAsyncThunk(
  "report/getPaymentReport",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/reports/payments");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch payment report"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Doctor Report                                                              */
/* -------------------------------------------------------------------------- */

export const getDoctorReport = createAsyncThunk(
  "report/getDoctorReport",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/reports/doctors");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch doctor report"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Patient Report                                                             */
/* -------------------------------------------------------------------------- */

export const getPatientReport = createAsyncThunk(
  "report/getPatientReport",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/reports/patients");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch patient report"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Medical Record Report                                                      */
/* -------------------------------------------------------------------------- */

export const getMedicalRecordReport = createAsyncThunk(
  "report/getMedicalRecordReport",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/reports/medical-records");

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to fetch medical record report"),
      );
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Report Slice                                                               */
/* -------------------------------------------------------------------------- */

const reportSlice = createSlice({
  name: "report",

  initialState,

  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },

    clearReportMessage: (state) => {
      state.message = null;
    },

    clearReport: (state) => {
      state.report = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Appointment Report                                                     */
      /* ---------------------------------------------------------------------- */

      .addCase(getAppointmentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getAppointmentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.message = action.payload.message;
      })

      .addCase(getAppointmentReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Payment Report                                                         */
      /* ---------------------------------------------------------------------- */

      .addCase(getPaymentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getPaymentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.message = action.payload.message;
      })

      .addCase(getPaymentReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Doctor Report                                                          */
      /* ---------------------------------------------------------------------- */

      .addCase(getDoctorReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getDoctorReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.message = action.payload.message;
      })

      .addCase(getDoctorReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Patient Report                                                         */
      /* ---------------------------------------------------------------------- */

      .addCase(getPatientReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getPatientReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.message = action.payload.message;
      })

      .addCase(getPatientReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Medical Record Report                                                  */
      /* ---------------------------------------------------------------------- */

      .addCase(getMedicalRecordReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getMedicalRecordReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.message = action.payload.message;
      })

      .addCase(getMedicalRecordReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const { clearReportError, clearReportMessage, clearReport } =
  reportSlice.actions;

export default reportSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectReport = (state) => state.report.report;

export const selectReportLoading = (state) => state.report.loading;

export const selectReportError = (state) => state.report.error;

export const selectReportMessage = (state) => state.report.message;
