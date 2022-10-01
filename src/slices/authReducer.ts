import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginProps {
  userEmail: string;
  userName: string;
  userId: string;
  tokenId: string;
  }

interface SignUpProps {
  userName: string;
  name: string;
  email:string;
}

export const axiosApi = axios.create({
  baseURL: "http://142.93.224.186:3000/",
  withCredentials: true,
});

export const initialState = {
  userEmail: '',
  userId: '',
  tokenId: '',
  userName: '', 
  status: 'idle', 
  error: null,
}

export const registerUser = createAsyncThunk('users/registerUser', 
  async ({ email, name }: {email:string, name:string} ) => {
    const response = await axiosApi.post(`users/register`, {
      email,
      name,
    });
    console.log(response.data);
    return response.data;
  }
)

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
  }, 
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'success';
        return action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.status = action.error.message;
      })
  }
})

export const {login, signUp, logout} = loginSlice.actions;
export const selectUser = (state) => state.user.user;

export default loginSlice.reducer;