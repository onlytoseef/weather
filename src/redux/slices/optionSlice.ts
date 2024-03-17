import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherState, City } from "../../types/types";

const apiKey = "5835ce7cca6e008a5ce418d6f91eaefa";

console.log("apiKey", apiKey);

const initialState: WeatherState = {
  data: {},
  loading: true,
  error: "",
};

export const getOptions = createAsyncThunk(
  "getOptions",
  async (value: string) => {
    try {
      let res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=3&appid=${apiKey}`
      );
      let data: City = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getOptionsStart = createAsyncThunk("getOptionsStart", async () => {
  return {};
});

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOptionsStart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOptionsStart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.data = {};
      })
      .addCase(
        getOptionsStart.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.data = {};
        }
      )
      .addCase(getOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getOptions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = {};
      });
  },
});

export default optionSlice.reducer;
