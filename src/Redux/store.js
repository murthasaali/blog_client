import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/authSlice';
import buttonUIReducer from './Features/buttonUiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    buttonUI: buttonUIReducer,
    // Add other reducers as needed
  },
});

export default store;
