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
  medicalRecords: [],

  medicalRecord: null,

  myMedicalRecords: [],

  doctorMedicalRecords: [],

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Get All Medical Records (Admin)                                            */
/* -------------------------------------------------------------------------- */

export const getMedicalRecords = createAsyncThunk(
  "medicalRecord/getMedicalRecords",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/medical-records");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch medical records"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Medical Record By ID                                                   */
/* -------------------------------------------------------------------------- */

export const getMedicalRecordById = createAsyncThunk(
  "medicalRecord/getMedicalRecordById",
  async (recordId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/medical-records/${recordId}`);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch medical record"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get My Medical Records (Patient)                                           */
/* -------------------------------------------------------------------------- */

export const getMyMedicalRecords = createAsyncThunk(
  "medicalRecord/getMyMedicalRecords",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/medical-records/my");

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to fetch my medical records"),
      );
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Doctor Medical Records                                                 */
/* -------------------------------------------------------------------------- */

export const getDoctorMedicalRecords = createAsyncThunk(
  "medicalRecord/getDoctorMedicalRecords",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/medical-records/doctor");

      return data;
    } catch (err) {
      return rejectWithValue(
        getError(err, "Failed to fetch doctor medical records"),
      );
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Create Medical Record (Doctor)                                             */
/* -------------------------------------------------------------------------- */

export const createMedicalRecord = createAsyncThunk(
  "medicalRecord/createMedicalRecord",
  async (recordData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/medical-records", recordData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to create medical record"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Update Medical Record (Doctor)                                             */
/* -------------------------------------------------------------------------- */

export const updateMedicalRecord = createAsyncThunk(
  "medicalRecord/updateMedicalRecord",
  async ({ recordId, recordData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/medical-records/${recordId}`,
        recordData,
      );

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to update medical record"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Delete Medical Record (Admin)                                              */
/* -------------------------------------------------------------------------- */

export const deleteMedicalRecord = createAsyncThunk(
  "medicalRecord/deleteMedicalRecord",
  async (recordId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/medical-records/${recordId}`);

      return {
        ...data,
        recordId,
      };
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to delete medical record"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Medical Record Slice                                                       */
/* -------------------------------------------------------------------------- */

const medicalRecordSlice = createSlice({
  name: "medicalRecord",

  initialState,

  reducers: {
    clearMedicalRecordError: (state) => {
      state.error = null;
    },

    clearMedicalRecordMessage: (state) => {
      state.message = null;
    },

    clearSelectedMedicalRecord: (state) => {
      state.medicalRecord = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Get All Medical Records (Admin)                                        */
      /* ---------------------------------------------------------------------- */

      .addCase(getMedicalRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;

        state.medicalRecords = action.payload.medicalRecords;
      })

      .addCase(getMedicalRecords.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Medical Record By ID                                               */
      /* ---------------------------------------------------------------------- */

      .addCase(getMedicalRecordById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getMedicalRecordById.fulfilled, (state, action) => {
        state.loading = false;

        state.medicalRecord = action.payload.medicalRecord;
      })

      .addCase(getMedicalRecordById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get My Medical Records (Patient)                                       */
      /* ---------------------------------------------------------------------- */

      .addCase(getMyMedicalRecords.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getMyMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;

        state.myMedicalRecords = action.payload.medicalRecords;
      })

      .addCase(getMyMedicalRecords.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Doctor Medical Records                                             */
      /* ---------------------------------------------------------------------- */

      .addCase(getDoctorMedicalRecords.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getDoctorMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;

        state.doctorMedicalRecords = action.payload.medicalRecords;
      })

      .addCase(getDoctorMedicalRecords.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      /* ---------------------------------------------------------------------- */
      /* Create Medical Record                                                  */
      /* ---------------------------------------------------------------------- */

      .addCase(createMedicalRecord.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;

        state.medicalRecords.unshift(action.payload.medicalRecord);

        state.doctorMedicalRecords.unshift(action.payload.medicalRecord);

        state.message = action.payload.message;
      })

      .addCase(createMedicalRecord.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Update Medical Record                                                  */
      /* ---------------------------------------------------------------------- */

      .addCase(updateMedicalRecord.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;

        state.medicalRecord = action.payload.medicalRecord;

        state.medicalRecords = state.medicalRecords.map((record) =>
          record.id === action.payload.medicalRecord.id
            ? action.payload.medicalRecord
            : record,
        );

        state.myMedicalRecords = state.myMedicalRecords.map((record) =>
          record.id === action.payload.medicalRecord.id
            ? action.payload.medicalRecord
            : record,
        );

        state.doctorMedicalRecords = state.doctorMedicalRecords.map((record) =>
          record.id === action.payload.medicalRecord.id
            ? action.payload.medicalRecord
            : record,
        );

        state.message = action.payload.message;
      })

      .addCase(updateMedicalRecord.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Delete Medical Record                                                  */
      /* ---------------------------------------------------------------------- */

      .addCase(deleteMedicalRecord.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        state.loading = false;

        state.medicalRecords = state.medicalRecords.filter(
          (record) => record.id !== action.payload.recordId,
        );

        state.myMedicalRecords = state.myMedicalRecords.filter(
          (record) => record.id !== action.payload.recordId,
        );

        state.doctorMedicalRecords = state.doctorMedicalRecords.filter(
          (record) => record.id !== action.payload.recordId,
        );

        if (state.medicalRecord?.id === action.payload.recordId) {
          state.medicalRecord = null;
        }

        state.message = action.payload.message;
      })

      .addCase(deleteMedicalRecord.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});
/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const {
  clearMedicalRecordError,
  clearMedicalRecordMessage,
  clearSelectedMedicalRecord,
} = medicalRecordSlice.actions;

export default medicalRecordSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectMedicalRecords = (state) =>
  state.medicalRecord.medicalRecords;

export const selectMedicalRecord = (state) => state.medicalRecord.medicalRecord;

export const selectMyMedicalRecords = (state) =>
  state.medicalRecord.myMedicalRecords;

export const selectDoctorMedicalRecords = (state) =>
  state.medicalRecord.doctorMedicalRecords;

export const selectMedicalRecordLoading = (state) =>
  state.medicalRecord.loading;

export const selectMedicalRecordError = (state) => state.medicalRecord.error;

export const selectMedicalRecordMessage = (state) =>
  state.medicalRecord.message;
