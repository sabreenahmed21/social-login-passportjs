import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get('https://server-social-login.onrender.com/auth/user', {
        withCredentials: true,
      });
      console.log(response);
      console.log('response.data.user', response.data.user); 
      if (response.status === 200) return response.data.user;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error;
    }
  }
);

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })    
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error fetching user data";
        state.isAuthenticated = false;
        console.error(action.error);
      });
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  loginsuccess,
} = userSlice.actions;
export default userSlice.reducer;
