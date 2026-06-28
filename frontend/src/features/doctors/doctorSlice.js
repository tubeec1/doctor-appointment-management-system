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
  doctors: [],

  doctor: null,

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Get All Doctors                                                            */
/* -------------------------------------------------------------------------- */

export const getDoctors = createAsyncThunk(
  "doctor/getDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/doctors");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch doctors"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Doctor By ID                                                           */
/* -------------------------------------------------------------------------- */

export const getDoctorById = createAsyncThunk(
  "doctor/getDoctorById",
  async (doctorId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/doctors/${doctorId}`);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch doctor"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Create Doctor                                                              */
/* -------------------------------------------------------------------------- */

export const createDoctor = createAsyncThunk(
  "doctor/createDoctor",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/doctors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to create doctor"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Update Doctor                                                              */
/* -------------------------------------------------------------------------- */

export const updateDoctor = createAsyncThunk(
  "doctor/updateDoctor",
  async ({ doctorId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/doctors/${doctorId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to update doctor"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Delete Doctor                                                              */
/* -------------------------------------------------------------------------- */

export const deleteDoctor = createAsyncThunk(
  "doctor/deleteDoctor",
  async (doctorId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/doctors/${doctorId}`);

      return {
        ...data,
        doctorId,
      };
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to delete doctor"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Doctor Slice                                                               */
/* -------------------------------------------------------------------------- */

const doctorSlice = createSlice({
  name: "doctor",

  initialState,

  reducers: {
    clearDoctorError: (state) => {
      state.error = null;
    },

    clearDoctorMessage: (state) => {
      state.message = null;
    },

    clearSelectedDoctor: (state) => {
      state.doctor = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Get Doctors                                                            */
      /* ---------------------------------------------------------------------- */

      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;

        state.doctors = action.payload.doctors;
      })

      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Doctor By ID                                                       */
      /* ---------------------------------------------------------------------- */

      .addCase(getDoctorById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.loading = false;

        state.doctor = action.payload.doctor;
      })

      .addCase(getDoctorById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Create Doctor                                                          */
      /* ---------------------------------------------------------------------- */

      .addCase(createDoctor.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;

        state.doctors.unshift(action.payload.doctor);

        state.doctor = action.payload.doctor;

        state.message = action.payload.message;
      })

      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      /* ---------------------------------------------------------------------- */
      /* Update Doctor                                                          */
      /* ---------------------------------------------------------------------- */

      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;

        state.doctor = action.payload.doctor;

        state.doctors = state.doctors.map((doctor) =>
          doctor.id === action.payload.doctor.id
            ? action.payload.doctor
            : doctor,
        );

        state.message = action.payload.message;
      })

      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Delete Doctor                                                          */
      /* ---------------------------------------------------------------------- */

      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;

        state.doctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload.doctorId,
        );

        if (state.doctor?.id === action.payload.doctorId) {
          state.doctor = null;
        }

        state.message = action.payload.message;
      })

      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});
/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const { clearDoctorError, clearDoctorMessage, clearSelectedDoctor } =
  doctorSlice.actions;

export default doctorSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectDoctors = (state) => state.doctor.doctors;

export const selectDoctor = (state) => state.doctor.doctor;

export const selectDoctorsCount = (state) => state.doctor.doctors.length;

export const selectDoctorLoading = (state) => state.doctor.loading;

export const selectDoctorError = (state) => state.doctor.error;

export const selectDoctorMessage = (state) => state.doctor.message;
