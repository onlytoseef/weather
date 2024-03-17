import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherDataObj, WeatherState } from "../../types/types";

const apiKey = import.meta.env.VITE_API_KEY;

const initialState: WeatherState = {
  data: {},
  loading: true,
  error: "",
};

export const getWeather = createAsyncThunk(
  "getWeather",
  async ({ lat, lon }: { lat: string; lon: string }) => {
    try {
      let res: WeatherDataObj = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = {};
      });
  },
});

export default weatherSlice.reducer;
