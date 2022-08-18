import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchName: '',
};

const contactsSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchContact: (state, action) => {
      state.searchName = action.payload;
    },
  },
});

const { actions, reducer } = contactsSlice;
export default reducer;
export const { searchContact } = actions;
