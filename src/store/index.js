import { configureStore } from '@reduxjs/toolkit';
import contacts from './reducers/contacts-slice';
import users from './reducers/users-slice';
import search from './reducers/search-slice';

const store = configureStore({
  reducer: { contacts, users, search },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
