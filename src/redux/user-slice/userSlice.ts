import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RegFormStateType } from '../../utilities/Types';

//  Base URL
const BASE_URL = 'http://127.0.0.1:3024/';

// Initial State Type
interface initialUserStateType {
  currentUser: {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  message: string;
  error: null | string;
}

// Initial State
const initialUserState = {
  currentUser: {},
  status: 'idle', // 'loading', 'succeeded', 'failed'
  message: '',
  error: null,
};

// Actions
const REGISTER_USER = 'REGISTER_USER';

// User Registration Action
export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (user: RegFormStateType) => {
    console.log('User: ', user);
    const response = await fetch(BASE_URL + 'user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ ...user }),
    });
    const { status } = response;
    const data = await response.json();
    console.log('Status: ', status);
    console.log('Data: ', data);
  }
);

// User Reducer
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => ({
        ...state,
        status: 'pending',
      }))
      .addCase(registerUser.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'succeeded',
      }))
      .addCase(registerUser.rejected, (state) => ({
        ...state,
        status: 'failed',
      }));
  },
});

// export const currentUser = (state) => (state.userStore.currentUser);
// export const currentUserRole = (state) => (state.userStore.currentUser.role);
// export const userStatus = (state) => (state.userStore.status);
// export const userMessage = (state) => (state.userStore.message);
// export const userError = (state) => (state.userStore.error);

export default userSlice.reducer;
