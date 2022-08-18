import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hooks';

const initialState = {
  contacts: [],
  contactsLoadingStatus: 'idle',
};

export const fetchContacts = createAsyncThunk('fetch/fetchContacts', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/contacts');
});

export const refreshContact = createAsyncThunk(
  'fetch/refreshNewContacts',
  ({ id, ...props }, { dispatch }) => {
    const { request } = useHttp();
    return request(
      `http://localhost:3001/contacts/${id}`,
      'PUT',
      JSON.stringify({ id, ...props })
    )
      .then((response) => console.log(response, 'Данные отправлены'))
      .then(dispatch(refreshedContacts({ id, ...props })))
      .catch((error) => console.log(error.message));
  }
);

export const deletedContact = createAsyncThunk(
  'fetch/deletedContacts',
  ({ id, ...props }, { dispatch }) => {
    const { request } = useHttp();
    return request(
      `http://localhost:3001/contacts/${id}`,
      'DELETE',
      JSON.stringify({ id, ...props })
    )
      .then((response) => console.log(response, 'Данные удалены'))
      .then(dispatch(delContact({ id, ...props })))
      .catch((error) => console.log(error.message));
  }
);

export const createNewContact = createAsyncThunk(
  'fetch/createContact',
  (newContact, { dispatch }) => {
    const { request } = useHttp();
    return request(
      `http://localhost:3001/contacts/`,
      'POST',
      JSON.stringify(newContact)
    )
      .then((response) => console.log(response, 'Данные отправлены'))
      .then(dispatch(addContact(newContact)))
      .catch((error) => console.log(error.message));
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    refreshedContacts: (state, action) => {
      const newContact = action.payload;
      const positionContact = state.contacts.findIndex(
        (x) => x.id === newContact.id
      );
      const newContacts = [...state.contacts];
      const oldContacts = newContacts.splice(positionContact, 1, newContact);

      state.contacts = [...newContacts];
    },
    delContact: (state, action) => {
      const newContact = action.payload;
      state.contacts = state.contacts.filter(
        (item) => item.id !== newContact.id
      );
    },
    addContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contactsLoadingStatus = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.contactsLoadingStatus = 'idle';
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.contactsLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = contactsSlice;
export default reducer;
export const { refreshedContacts, delContact, addContact, addUser } = actions;
