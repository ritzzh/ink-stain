import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: '#FFFFFF', // Default theme color
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
