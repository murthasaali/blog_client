// buttonUISlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSection: "home", // Default section
};

const buttonUISlice = createSlice({
  name: 'buttonUI',
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.currentSection = action.payload; // Update current section
    },
  },
});

export const { setSection } = buttonUISlice.actions;
export default buttonUISlice.reducer;
