
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface LoginToTasksProps {
  userEmail: string;
  password: string;
  cb: () => void;
}

interface SignUpProps {
  userEmail: string;
  password: string;
  userName: string;
  cb: ()=> void;
}

interface LogoutProps {
  cb: ()=> void;
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
      payload.cb()
    },

    logout: (state ,{payload}: PayloadAction<LogoutProps>) => {
      state.userName = initialState.userName;
      state.userEmail = initialState.userEmail;
      state.password = initialState.password;
      // state = {...state, ...initialState}
      console.log(state)
      payload.cb()
    } 
  }
})

export const {loginCheck, signUp, logout} = loginSlice.actions;
export default loginSlice.reducer;