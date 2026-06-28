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
  user: null,

  token: localStorage.getItem("token") || null,

  isAuthenticated: !!localStorage.getItem("token"),

  loading: false,

  error: null,

  message: null,
};

/* -------------------------------------------------------------------------- */
/* Register User                                                              */
/* -------------------------------------------------------------------------- */

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", userData);

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Registration failed"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Login User                                                                 */
/* -------------------------------------------------------------------------- */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", credentials);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Login failed"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Get Profile                                                                */
/* -------------------------------------------------------------------------- */

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/profile");

      return data;
    } catch (err) {
      localStorage.removeItem("token");

      return rejectWithValue(getError(err, "Failed to load profile"));
    }
  },
);
/* -------------------------------------------------------------------------- */
/* Update Profile                                                             */
/* -------------------------------------------------------------------------- */

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Profile update failed"));
    }
  },
);

/* -------------------------------------------------------------------------- */
/* Logout                                                                     */
/* -------------------------------------------------------------------------- */

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  return true;
});

/* -------------------------------------------------------------------------- */
/* Auth Slice                                                                 */
/* -------------------------------------------------------------------------- */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------- */
    /* Register                                                               */
    /* ---------------------------------------------------------------------- */

    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.message = action.payload.message;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* -------------------------------------------------------------------- */
      /* Login                                                                 */
      /* -------------------------------------------------------------------- */

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.token;

        state.isAuthenticated = true;

        state.message = action.payload.message;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      /* -------------------------------------------------------------------- */
      /* Get Profile                                                          */
      /* -------------------------------------------------------------------- */

      .addCase(getProfile.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
        localStorage.removeItem("token");

        state.loading = false;

        state.error = action.payload;

        state.user = null;

        state.token = null;

        state.isAuthenticated = false;
      })

      /* -------------------------------------------------------------------- */
      /* Update Profile                                                       */
      /* -------------------------------------------------------------------- */

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;

        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.message = action.payload.message;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* -------------------------------------------------------------------- */
      /* Logout                                                               */
      /* -------------------------------------------------------------------- */

      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("token");

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.message = null;
      });
  },
});
/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

export const { clearError, clearMessage } = authSlice.actions;

export default authSlice.reducer;

/* -------------------------------------------------------------------------- */
/* Selectors                                                                  */
/* -------------------------------------------------------------------------- */

export const selectAuth = (state) => state.auth;

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectAuthLoading = (state) => state.auth.loading;

export const selectAuthError = (state) => state.auth.error;

export const selectAuthMessage = (state) => state.auth.message;
