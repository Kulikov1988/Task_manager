import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginProps {
  userEmail: string;
  userName: string;
  userId: string;
  tokenId: string;
  }

interface SignUpProps {
  userName: string;
}

export const initialState = {
  userEmail: '',
  userId: '',
  tokenId: '',
  userName: '',
}

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state ,{payload}: PayloadAction<LoginProps> ) => { 
      state.tokenId = payload.tokenId;
      state.userEmail = payload.userEmail;
      state.userId = payload.userId;
      state.userName = payload.userName;
    },
    signUp: (state, {payload}: PayloadAction<SignUpProps>) => {
      state.userName = payload.userName;
      console.log(payload.userName)
    },
    logout: (state) => initialState
  }
})

export const {login, signUp, logout} = loginSlice.actions;
export const selectUser = (state) => state.user.user;

export default loginSlice.reducer;