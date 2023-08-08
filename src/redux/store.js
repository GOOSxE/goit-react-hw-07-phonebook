import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
// ? // Створення та конфігурація стору redux-toolkit ;
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
