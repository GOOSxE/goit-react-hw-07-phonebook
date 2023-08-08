import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import addContact from 'API/addContactAPI';
import fetchContacts from 'API/fetchContactsAPI';
import removeContact from 'API/removeContactAPI';
const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
  filterValue: '',
};
export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchContactsThunk',
  async (_, thunkApi) => {
    try {
      const contactsData = await fetchContacts();
      return contactsData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const addNewContactThunk = createAsyncThunk(
  'contacts/addNewContactThunk',
  async (newContact, thunkApi) => {
    try {
      const response = await addContact(newContact);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const removeContactThunk = createAsyncThunk(
  'contacts/removeContactThunk',
  async (contactId, thunkApi) => {
    try {
      const response = await removeContact(contactId);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// ? // Слайс із редюсерами, що встановлюють імутабельним чином контакти, та поточне значення фільтру ;
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // ? // Редюсер зміни стану завантаження ;
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // ? // Редюсер встановлення стану помилки ;
    setError: (state, action) => {
      state.error = action.payload;
    },
    // ? // Редюсер встановлення значення фільтру ;
    setFilter: (state, action) => {
      state.filterValue = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContactsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addNewContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addNewContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(removeContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});
// ? // Генерація екшенів ;
export const { setIsLoading, setError, setFilter } = contactsSlice.actions;
// ? // Генерація root-редюсеру ;
export const contactsReducer = contactsSlice.reducer;
