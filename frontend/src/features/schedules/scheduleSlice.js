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
  schedules: [],

  schedule: null,

  doctorSchedules: [],

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Get All Schedules                                                          */
/* -------------------------------------------------------------------------- */

export const getSchedules = createAsyncThunk(
  "schedule/getSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/schedules");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch schedules"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Schedule By ID                                                         */
/* -------------------------------------------------------------------------- */

export const getScheduleById = createAsyncThunk(
  "schedule/getScheduleById",
  async (scheduleId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/schedules/${scheduleId}`);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch schedule"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Doctor Schedules                                                       */
/* -------------------------------------------------------------------------- */

export const getDoctorSchedules = createAsyncThunk(
  "schedule/getDoctorSchedules",
  async (doctorId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/schedules/doctor/${doctorId}`);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch doctor schedules"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Create Schedule                                                            */
/* -------------------------------------------------------------------------- */

export const createSchedule = createAsyncThunk(
  "schedule/createSchedule",
  async (scheduleData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/schedules", scheduleData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to create schedule"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Update Schedule                                                            */
/* -------------------------------------------------------------------------- */

export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ scheduleId, scheduleData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/schedules/${scheduleId}`, scheduleData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to update schedule"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Delete Schedule                                                            */
/* -------------------------------------------------------------------------- */

export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (scheduleId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/schedules/${scheduleId}`);

      return {
        ...data,
        scheduleId,
      };
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to delete schedule"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Schedule Slice                                                             */
/* -------------------------------------------------------------------------- */

const scheduleSlice = createSlice({
  name: "schedule",

  initialState,

  reducers: {
    clearScheduleError: (state) => {
      state.error = null;
    },

    clearScheduleMessage: (state) => {
      state.message = null;
    },

    clearSelectedSchedule: (state) => {
      state.schedule = null;
    },

    clearDoctorSchedules: (state) => {
      state.doctorSchedules = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Get All Schedules                                                      */
      /* ---------------------------------------------------------------------- */

      .addCase(getSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getSchedules.fulfilled, (state, action) => {
        state.loading = false;

        state.schedules = action.payload.schedules;
      })

      .addCase(getSchedules.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Schedule By ID                                                     */
      /* ---------------------------------------------------------------------- */

      .addCase(getScheduleById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.loading = false;

        state.schedule = action.payload.schedule;
      })

      .addCase(getScheduleById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Doctor Schedules                                                   */
      /* ---------------------------------------------------------------------- */

      .addCase(getDoctorSchedules.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getDoctorSchedules.fulfilled, (state, action) => {
        state.loading = false;

        state.doctorSchedules = action.payload.schedules;
      })

      .addCase(getDoctorSchedules.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      /* ---------------------------------------------------------------------- */
      /* Create Schedule                                                       */
      /* ---------------------------------------------------------------------- */

      .addCase(createSchedule.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(createSchedule.fulfilled, (state, action) => {
        state.loading = false;

        state.schedules.unshift(action.payload.schedule);

        state.schedule = action.payload.schedule;

        state.message = action.payload.message;
      })

      .addCase(createSchedule.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Update Schedule                                                       */
      /* ---------------------------------------------------------------------- */

      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.loading = false;

        state.schedule = action.payload.schedule;

        state.schedules = state.schedules.map((schedule) =>
          schedule.id === action.payload.schedule.id
            ? action.payload.schedule
            : schedule,
        );

        state.doctorSchedules = state.doctorSchedules.map((schedule) =>
          schedule.id === action.payload.schedule.id
            ? action.payload.schedule
            : schedule,
        );

        state.message = action.payload.message;
      })

      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Delete Schedule                                                       */
      /* ---------------------------------------------------------------------- */

      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.loading = false;

        state.schedules = state.schedules.filter(
          (schedule) => schedule.id !== action.payload.scheduleId,
        );

        state.doctorSchedules = state.doctorSchedules.filter(
          (schedule) => schedule.id !== action.payload.scheduleId,
        );

        if (state.schedule?.id === action.payload.scheduleId) {
          state.schedule = null;
        }

        state.message = action.payload.message;
      })

      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});
/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const {
  clearScheduleError,
  clearScheduleMessage,
  clearSelectedSchedule,
  clearDoctorSchedules,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectSchedules = (state) => state.schedule.schedules;

export const selectSchedule = (state) => state.schedule.schedule;

export const selectDoctorSchedules = (state) => state.schedule.doctorSchedules;

export const selectSchedulesCount = (state) => state.schedule.schedules.length;

export const selectScheduleLoading = (state) => state.schedule.loading;

export const selectScheduleError = (state) => state.schedule.error;

export const selectScheduleMessage = (state) => state.schedule.message;
