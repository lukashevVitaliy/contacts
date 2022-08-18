import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hooks';

const initialState = {
  users: null,
  userLogin: null,
  usersLoadingStatus: 'idle',
};

export const fetchUsers = createAsyncThunk('fetch/fetchUsers', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/users');
});

export const createNewUser = createAsyncThunk(
  'fetch/createNewUser',
  (newUser, { dispatch }) => {
    const { request } = useHttp();
    return request(
      `http://localhost:3001/users/`,
      'POST',
      JSON.stringify(newUser)
    )
      .then((response) => console.log(response, 'Данные отправлены'))
      .then(dispatch(addUser(newUser)))
      .catch((error) => console.log(error.message));
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.contacts = [...state.users, action.payload];
    },
    loginUser: (state, action) => {
      state.userLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoadingStatus = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersLoadingStatus = 'idle';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = usersSlice;

export default reducer;

export const { addUser, loginUser } = actions;
