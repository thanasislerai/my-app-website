import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThemeState } from "./types";

const themeInitialState: ThemeState = {
  type: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState["type"]>) => ({
      ...state,
      type: action.payload,
    }),
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
