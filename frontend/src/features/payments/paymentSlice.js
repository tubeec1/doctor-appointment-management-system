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
  payments: [],

  payment: null,

  myPayments: [],

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Get All Payments (Admin)                                                   */
/* -------------------------------------------------------------------------- */

export const getPayments = createAsyncThunk(
  "payment/getPayments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/payments");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch payments"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Get Payment By ID (Admin)                                                  */
/* -------------------------------------------------------------------------- */

export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (paymentId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/payments/${paymentId}`);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch payment"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get My Payments (Patient)                                                  */
/* -------------------------------------------------------------------------- */

export const getMyPayments = createAsyncThunk(
  "payment/getMyPayments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/payments/my");

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to fetch my payments"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Create Payment (Patient)                                                   */
/* -------------------------------------------------------------------------- */

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/payments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to submit payment"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Update Payment (Admin)                                                     */
/* -------------------------------------------------------------------------- */

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async ({ paymentId, paymentData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/payments/${paymentId}`, paymentData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to update payment"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Delete Payment (Admin)                                                     */
/* -------------------------------------------------------------------------- */

export const deletePayment = createAsyncThunk(
  "payment/deletePayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/payments/${paymentId}`);

      return {
        ...data,
        paymentId,
      };
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to delete payment"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Payment Slice                                                              */
/* -------------------------------------------------------------------------- */

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },

    clearPaymentMessage: (state) => {
      state.message = null;
    },

    clearSelectedPayment: (state) => {
      state.payment = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------------------------------------------------------------- */
      /* Get All Payments (Admin)                                               */
      /* ---------------------------------------------------------------------- */

      .addCase(getPayments.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.message = null;
      })

      .addCase(getPayments.fulfilled, (state, action) => {
        state.loading = false;

        state.payments = action.payload.payments;
      })

      .addCase(getPayments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get Payment By ID                                                      */
      /* ---------------------------------------------------------------------- */

      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;

        state.payment = action.payload.payment;
      })

      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Get My Payments                                                        */
      /* ---------------------------------------------------------------------- */

      .addCase(getMyPayments.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getMyPayments.fulfilled, (state, action) => {
        state.loading = false;

        state.myPayments = action.payload.payments;
      })

      .addCase(getMyPayments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      /* ---------------------------------------------------------------------- */
      /* Create Payment                                                         */
      /* ---------------------------------------------------------------------- */

      .addCase(createPayment.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;

        state.payments.unshift(action.payload.payment);

        state.myPayments.unshift(action.payload.payment);

        state.message = action.payload.message;
      })

      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Update Payment                                                         */
      /* ---------------------------------------------------------------------- */

      .addCase(updatePayment.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;

        state.payment = action.payload.payment;

        state.payments = state.payments.map((payment) =>
          payment.id === action.payload.payment.id
            ? action.payload.payment
            : payment,
        );

        state.myPayments = state.myPayments.map((payment) =>
          payment.id === action.payload.payment.id
            ? action.payload.payment
            : payment,
        );

        state.message = action.payload.message;
      })

      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* ---------------------------------------------------------------------- */
      /* Delete Payment                                                         */
      /* ---------------------------------------------------------------------- */

      .addCase(deletePayment.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;

        state.payments = state.payments.filter(
          (payment) => payment.id !== action.payload.paymentId,
        );

        state.myPayments = state.myPayments.filter(
          (payment) => payment.id !== action.payload.paymentId,
        );

        if (state.payment?.id === action.payload.paymentId) {
          state.payment = null;
        }

        state.message = action.payload.message;
      })

      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});
/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const { clearPaymentError, clearPaymentMessage, clearSelectedPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectPayments = (state) => state.payment.payments;

export const selectPayment = (state) => state.payment.payment;

export const selectMyPayments = (state) => state.payment.myPayments;

export const selectPaymentLoading = (state) => state.payment.loading;

export const selectPaymentError = (state) => state.payment.error;

export const selectPaymentMessage = (state) => state.payment.message;
