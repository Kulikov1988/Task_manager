
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginToTasksProps {
  userEmail: string;
  password: string;
  isAuth: boolean;
  cb: () => void;
}

interface SignUpProps {
  userEmail: string;
  password: string;
  userName: string;
  isAuth: boolean;
  cb: () => void;
}

export const correctUser = {
  correctUserName : 'Tolik',
  userEmail: 'a@a.com',
  password: '123',
  err: 'Email or password are discorrect',
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
        state.isAuth = true; 
        payload.cb()
      } else {
        state.err = correctUser.err;
        state.userName = '';
        state.isAuth = false;
      } 

    },
    signUp: (state, {payload}: PayloadAction<SignUpProps>) => {
      state.userName = payload.userName;
      state.userEmail = payload.userEmail;
      state.password = payload.password;
      state.isAuth = true;
      payload.cb()
    },

    logout: (state ) => {
      state.isAuth = false;
    } 
  }
})

export const {loginCheck, signUp, logout} = loginSlice.actions;
export default loginSlice.reducer;