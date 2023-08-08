import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  contacts: [],
  filterValue: '',
};
// ? // Слайс із редюсерами, що встановлюють імутабельним чином контакти, та поточне значення фільтру ;
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // ? // Редюсер додавання контакту в масив ;
    addContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },
    // ? // Редюсер додавання контакту в масив ;
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(el => el.id !== action.payload);
    },
    // ? // Редюсер встановлення значення фільтру ;
    setFilter: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});
// ? // Генерація екшенів ;
export const { addContact, removeContact, setFilter } = contactsSlice.actions;
// ? // Генерація root-редюсеру ;
export const contactsReducer = contactsSlice.reducer;
