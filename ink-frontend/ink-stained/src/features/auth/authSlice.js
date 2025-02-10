import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../../utils/constants";

// Load state from localStorage
const loadState = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      return { token, user, isAuthenticated: true };
    }
  } catch {
    // If there's an issue with localStorage, fallback to default state
  }
  return { token: null, user: null, isAuthenticated: false };
};

const initialState = {
  ...loadState(),
  loading: false,
  error: null,
  success: null,
};

// Async thunk for register
export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.REGISTER, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.LOGIN, { username, password });
      const { token, user } = response.data;

      console.log(response.data)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({username:user}));

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  // Remove user data from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Return null to reset state
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = "Registration successful!";
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        // Reset the state after logout
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

// Export actions
export const { clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;
