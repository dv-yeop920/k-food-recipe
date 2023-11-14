import { createSlice } from '@reduxjs/toolkit';


export const themeSlice = createSlice({
  name: "theme",

  initialState: {
    isDark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const theme = (state) => state.theme.isDark;

export default themeSlice;
