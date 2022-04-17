
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginToTasksProps  {
  userEmail: string;
  password: string;
}

export const correctUser = {
  correctUserName : 'Tolik',
  userEmail: 'kulikov.tolik@gmail.com',
  password: '123',
  err: 'some error',
  isAuth: true
  }

export const initialState = {
  userEmail: '',
  password: '',
  userName: '',
  err: '',
  isAuth: false,
}

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginCheck: (state ,{payload}: PayloadAction<LoginToTasksProps> ) => { 
      if (correctUser.userEmail === payload.userEmail && correctUser.password === payload.password)  {
        state.userName = correctUser.correctUserName;
        state.err = '';
        state.isAuth = correctUser.isAuth;
        console.log(initialState.isAuth)

      } else {
        state.err = correctUser.err;
        state.userName = '';
        state.isAuth = initialState.isAuth;
      }  
    },
    signUp: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.password = action.payload.password;
    }
  }
})

export const {loginCheck, signUp} = loginSlice.actions;
export default loginSlice.reducer;