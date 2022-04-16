
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginToTasksProps  {
  userEmail: string;
  password: string;
}

export const correctUser = {
  correctUserName : 'Tolik',
  userEmail: 'kulikov.tolik@gmail.com',
  password: '123',
  err: 'some error'
  }

export const initialState = {
  userEmail: '',
  password: '',
  userName: '',
  err: '',
}

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginToTasks: (state ,{payload}: PayloadAction<LoginToTasksProps> ) => { 
      if (correctUser.userEmail === payload.userEmail && correctUser.password === payload.password)  {
        state.userName = correctUser.correctUserName;
        state.err = ''
      } else {
        state.err = correctUser.err;
        state.userName = ''
      }  
    },
    signUp: (state, action) => {
      state.userName = action.payload.userEmail;
    }
  }
})

export const {loginToTasks, signUp} = loginSlice.actions;
export default loginSlice.reducer;