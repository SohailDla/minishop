import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const themeSlice = createSlice({
  name: "theme",
  initialState: { isDark: false },
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const selectIsDark = (state: RootState) => state.theme.isDark;
