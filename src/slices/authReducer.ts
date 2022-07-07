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

interface LoginToUserTasksProps {
  cb: () => void;
}

// export const correctUser = {
//   correctUserName : 'Tolik',
//   userEmail: 'a@a.com',
//   password: '123456',
//   err: 'Email or password are discorrect',
//   }

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
    loginToUserTasks: (state, {payload}: PayloadAction<LoginToUserTasksProps>) => {
      payload.cb();
    },

    logout: (state) => { 
      state.tokenId = '';
      state.userEmail = '';
      state.userId = '';
      state.userName = '';
    }
  }
})

export const {login, signUp, logout, loginToUserTasks} = loginSlice.actions;
export const selectUser = (state) => state.user.user;

export default loginSlice.reducer;