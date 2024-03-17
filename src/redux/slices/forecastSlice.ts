import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { ForecastState, ApiResponse } from "../../types/types";

const apiKey = import.meta.env.VITE_API_KEY;

const initialState: ForecastState = {
  data: {},
  loading: false,
  error: "",
};

export const getForecast = createAsyncThunk(
  "getForecast",
  async ({ lat, lon }: { lat: string; lon: string }, { rejectWithValue }) => {
    try {
      const res: ApiResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${apiKey}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const forecastSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getForecast.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = {};
      });
  },
});

export default forecastSlice.reducer;
