
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userEmail: '',
  userPassword: '',
}

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    confirmPassword: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.userPassword = action.payload.userPassword;
    }
  }
})

export const {confirmPassword} = signInSlice.actions;
export default signInSlice.reducer;
