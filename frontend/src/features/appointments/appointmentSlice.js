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
  appointments: [],

  appointment: null,

  myAppointments: [],

  doctorAppointments: [],

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Get All Appointments (Admin)                                               */
/* -------------------------------------------------------------------------- */

export const getAppointments = createAsyncThunk(
  "appointment/getAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/appointments");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch appointments"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Appointment By ID                                                      */
/* -------------------------------------------------------------------------- */

export const getAppointmentById = createAsyncThunk(
  "appointment/getAppointmentById",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/appointments/${appointmentId}`);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch appointment"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get My Appointments (Patient)                                              */
/* -------------------------------------------------------------------------- */

export const getMyAppointments = createAsyncThunk(
  "appointment/getMyAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/appointments/my");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch my appointments"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Doctor Appointments                                                    */
/* -------------------------------------------------------------------------- */

export const getDoctorAppointments = createAsyncThunk(
  "appointment/getDoctorAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/appointments/doctor");

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to fetch doctor appointments"),
      );
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Create Appointment (Patient)                                               */
/* -------------------------------------------------------------------------- */

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/appointments", appointmentData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to create appointment"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Update Appointment Status (Doctor/Admin)                                   */
/* -------------------------------------------------------------------------- */

export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateAppointmentStatus",
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/appointments/status/${appointmentId}`, {
        status,
      });

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to update appointment status"),
      );
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Cancel Appointment (Patient)                                               */
/* -------------------------------------------------------------------------- */

export const cancelAppointment = createAsyncThunk(
  "appointment/cancelAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/appointments/cancel/${appointmentId}`);

      return {
        ...data,
        appointmentId,
      };
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to cancel appointment"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Delete Appointment (Admin)                                                 */
/* -------------------------------------------------------------------------- */

export const deleteAppointment = createAsyncThunk(
  "appointment/deleteAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/appointments/${appointmentId}`);

      return {
        ...data,
        appointmentId,
      };
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to delete appointment"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Appointment Slice                                                          */
/* -------------------------------------------------------------------------- */

const appointmentSlice = createSlice({
  name: "appointment",

  initialState,

  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },

    clearAppointmentMessage: (state) => {
      state.message = null;
    },

    clearSelectedAppointment: (state) => {
      state.appointment = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Get All Appointments (Admin)                                           */
      /* ---------------------------------------------------------------------- */

      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments = action.payload.appointments;
      })

      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Appointment By ID                                                  */
      /* ---------------------------------------------------------------------- */

      .addCase(getAppointmentById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getAppointmentById.fulfilled, (state, action) => {
        state.loading = false;

        state.appointment = action.payload.appointment;
      })

      .addCase(getAppointmentById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get My Appointments                                                    */
      /* ---------------------------------------------------------------------- */

      .addCase(getMyAppointments.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getMyAppointments.fulfilled, (state, action) => {
        state.loading = false;

        state.myAppointments = action.payload.appointments;
      })

      .addCase(getMyAppointments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Doctor Appointments                                                */
      /* ---------------------------------------------------------------------- */

      .addCase(getDoctorAppointments.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;

        state.doctorAppointments = action.payload.appointments;
      })

      .addCase(getDoctorAppointments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Create Appointment                                                     */
      /* ---------------------------------------------------------------------- */

      .addCase(createAppointment.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments.unshift(action.payload.appointment);

        state.myAppointments.unshift(action.payload.appointment);

        state.message = action.payload.message;
      })

      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Update Appointment Status                                              */
      /* ---------------------------------------------------------------------- */

      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.appointment = action.payload.appointment;

        state.appointments = state.appointments.map((appointment) =>
          appointment.id === action.payload.appointment.id
            ? action.payload.appointment
            : appointment,
        );

        state.myAppointments = state.myAppointments.map((appointment) =>
          appointment.id === action.payload.appointment.id
            ? action.payload.appointment
            : appointment,
        );

        state.doctorAppointments = state.doctorAppointments.map(
          (appointment) =>
            appointment.id === action.payload.appointment.id
              ? action.payload.appointment
              : appointment,
        );

        state.message = action.payload.message;
      })

      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Cancel Appointment                                                     */
      /* ---------------------------------------------------------------------- */

      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;

        state.appointment = action.payload.appointment;

        state.appointments = state.appointments.map((appointment) =>
          appointment.id === action.payload.appointment.id
            ? action.payload.appointment
            : appointment,
        );

        state.myAppointments = state.myAppointments.map((appointment) =>
          appointment.id === action.payload.appointment.id
            ? action.payload.appointment
            : appointment,
        );

        state.doctorAppointments = state.doctorAppointments.map(
          (appointment) =>
            appointment.id === action.payload.appointment.id
              ? action.payload.appointment
              : appointment,
        );

        state.message = action.payload.message;
      })

      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Delete Appointment                                                     */
      /* ---------------------------------------------------------------------- */

      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments = state.appointments.filter(
          (appointment) => appointment.id !== action.payload.appointmentId,
        );

        state.myAppointments = state.myAppointments.filter(
          (appointment) => appointment.id !== action.payload.appointmentId,
        );

        state.doctorAppointments = state.doctorAppointments.filter(
          (appointment) => appointment.id !== action.payload.appointmentId,
        );

        if (state.appointment?.id === action.payload.appointmentId) {
          state.appointment = null;
        }

        state.message = action.payload.message;
      })

      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});
/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const {
  clearAppointmentError,
  clearAppointmentMessage,
  clearSelectedAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectAppointments = (state) => state.appointment.appointments;

export const selectAppointment = (state) => state.appointment.appointment;

export const selectMyAppointments = (state) => state.appointment.myAppointments;

export const selectDoctorAppointments = (state) =>
  state.appointment.doctorAppointments;

export const selectAppointmentLoading = (state) => state.appointment.loading;

export const selectAppointmentError = (state) => state.appointment.error;

export const selectAppointmentMessage = (state) => state.appointment.message;
