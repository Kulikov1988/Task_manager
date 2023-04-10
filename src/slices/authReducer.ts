import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginProps {
  userEmail: string;
  userName: string;
  userId: string;
  }

interface RegisterProps {
  email: string;
  name: string;
  password: string;
}

interface RegisterError {
  field: string ;
  message: string ;
}

interface InitialState {
  user: {
    userEmail: string,
    userId: string,
    userName: string,
  },
  register: {
    status: "idle" | "loading" | "reject" | "success",
    error: RegisterError[] | null,
  },
  login: {
    status: "idle" | "loading" | "reject" | "success",
    error: null | RegisterError[],
  },
  isAuth: boolean;
}

export const axiosApi = axios.create({
  baseURL: "",
  withCredentials: true,
});

export const initialState: InitialState = {
  user: {
    userEmail: '',
    userId: '',
    userName: '', 
  },
  register: {
    status: "idle",
    error: null
  },
  login: {
    status: 'idle',
    error: null,
  },
  isAuth: false
}

export const registerUser = createAsyncThunk('users/registerUser', 
  async ({ email, name, password }: RegisterProps, thunkApi ) => {
    try {
      const response = await axiosApi.post(`users/register`, {
        email,
        name,
        password
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const loginUser = createAsyncThunk(`users/loginUser`,
async ({ email, password}: {email: string, password: string}, thunkApi) => {
  try {
    const response = await axiosApi.post(`users/login`, {
      email,
      password
    }); 
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
})

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state ,{payload}: PayloadAction<LoginProps> ) => { 
      state.user.userEmail = payload.userEmail;
      state.user.userId = payload.userId;
      state.user.userName = payload.userName;
    },
    resetRegister: (state) => {
      state.register.status = 'idle';
      state.register.error = null;
    },
    resetLogin: (state) => {
      state.login.status = 'idle';
      state.login.error = null;
    },
    logout: (state) => initialState
  }, 
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log('loading')
        state.register.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('success')
        state.register.status = 'success';
        state.user.userEmail = action.payload;
        state.user.userName = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.status = 'reject';
        state.register.error = action.payload as RegisterError[]
      })
      .addCase(loginUser.pending, (state) => {
        console.log('login loading');
        state.login.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('login success');
        state.login.status = 'success';
        state.user.userEmail = action.payload.email;
        state.user.userName = action.payload.name;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('login error');
        state.login.error = action.payload as RegisterError[];
      })
  }
})

export const {login, logout, resetRegister, resetLogin} = loginSlice.actions;
export const selectUser = (state) => state.user.user;

export default loginSlice.reducer;