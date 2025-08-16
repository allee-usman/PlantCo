import {
  deleteSecureItem,
  getSecureItem,
  saveSecureItem,
} from "@/src/utils/secureStore";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  //TODO: Update this as per user.model
  _id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
  isInitialized: boolean; //Track if we've loaded the token on app start
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  isLoading: false,
  isInitialized: false, // Initially false until we check for stored token
};

const BASE_URI = "http://192.168.100.10:8080";

// 'auth/registerUser' -> Action type prefix
export const registerUser = createAsyncThunk<
  { user: User; token: string }, // Returned data type
  { username: string; email: string; password: string }, // Argument type
  { rejectValue: string } // Error type
>(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URI}/api/auth/signup`, {
        username,
        email,
        password,
      });
      await saveSecureItem("token", res.data.token);
      return res.data; //{user, token} -> sent to extraReducers as action.payload
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Sign Up failed!",
      );
    }
  },
);

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string; rememberMe: boolean },
  { rejectValue: string }
>(
  "auth/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URI}/api/auth/login`, {
        email,
        password,
      });
      if (rememberMe) {
        await saveSecureItem("token", res.data.token);
      }
      return res.data; //{user, token}
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed!!");
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await deleteSecureItem("token");
  return null;
});

// Auto login - load token from secure storage
export const loadToken = createAsyncThunk<
  { token: string; user: User } | null,
  void,
  { rejectValue: string }
>("auth/loadToken", async (_, { rejectWithValue }) => {
  try {
    const token = await getSecureItem("token");
    if (!token) {
      return null; // No token found → go to login
    }

    // Verify token with backend
    const res = await axios.get(`${BASE_URI}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { token, user: res.data.user };
  } catch (error: any) {
    console.error(
      "Error loading/verifying token:",
      error?.response?.data || error.message,
    );

    await deleteSecureItem("token");
    return rejectWithValue("Session expired, please log in again!");
  }
});

const authSlice = createSlice({
  name: "auth", //name of slice (prefix for actions)
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoading = false;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.user = action.payload.user;
          state.isLoading = false;
          state.token = action.payload.token;
          state.error = null;
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      // Logout user cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      // Load token cases
      .addCase(loadToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loadToken.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: User } | null>,
        ) => {
          if (action.payload) {
            state.token = action.payload.token;
            state.user = action.payload.user;
          } else {
            state.token = null;
            state.user = null;
          }
          state.isInitialized = true;
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(loadToken.rejected, (state, action) => {
        state.isInitialized = true;
        state.isLoading = false;
        state.error = action.payload as string;
        state.token = null;
        state.user = null;
      });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
