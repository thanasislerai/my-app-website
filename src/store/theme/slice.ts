import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThemeState } from "./types";

const themeInitialState: ThemeState = {
  mode: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState["mode"]>) => ({
      ...state,
      mode: action.payload,
    }),
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
