
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface LoginToTasksProps {
  userEmail: string;
  userName: string;
  userId: string;
  tokenId: string;
  
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
  password: '123456',
  err: 'Email or password are discorrect',
  isAuth: true
  }

export const initialState = {
  userEmail: '',
  // password: '',
  userName: '',
  err: '',
  userId: '',
  tokenId: '',
  isAuth: false,
}



const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginCheck: (state ,{payload}: PayloadAction<LoginToTasksProps> ) => { 
      console.log('login check')
      state.isAuth = true;
      state.tokenId = payload.tokenId;
      state.userEmail = payload.userEmail;
      state.userId = payload.userId;
      state.userName = 'Tolian';
      // payload.cb()

      // if (correctUser.userEmail === payload.userEmail && correctUser.password === payload.password)  {
      //   state.userName = correctUser.correctUserName;
      //   state.err = '';
      //   state.isAuth = true; 
      //   payload.cb()
      // } else {
      //   state.err = correctUser.err;
      //   state.userName = '';
      //   state.isAuth = false;
      // } 

    },
    signUp: (state, {payload}: PayloadAction<SignUpProps>) => {
      state.userName = payload.userName;
      state.userEmail = payload.userEmail;
      // state.password = payload.password;
      state.isAuth = true;
      payload.cb()
    },

    logout: () => initialState
  }
})

export const {loginCheck, signUp, logout} = loginSlice.actions;
export default loginSlice.reducer;