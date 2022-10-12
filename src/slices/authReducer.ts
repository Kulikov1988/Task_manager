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
    userName: string
  },
  register: {
    status: "idle" | "loading" | "reject" | "success",
    error: RegisterError[] | null,
  },
  login: {
    status: "idle" | "loading" | "reject" | "success",
    error: null | string,
  },

}

export const axiosApi = axios.create({
  baseURL: "http://142.93.224.186:3000/",
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
  }
}

export const registerUser = createAsyncThunk('users/registerUser', 
  async ({ email, name, password }: RegisterProps, thunkApi ) => {
    try {
      const response = await axiosApi.post(`users/register`, {
        email,
        name,
        password
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
    
  }
)

export const loginUser = createAsyncThunk('users/loginUser',
async ({name}: {name: string}, thunkApi) => {
  try {
    const response = await axiosApi.post(`users/login`, {
      name
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
    // signUp: (state, {payload}: PayloadAction<SignUpProps>) => {
    //   state.user.userName = payload.userName;
    //   console.log(payload.userName)
    // },
    resetRegister: (state ) => {
      state.register.status = 'idle';
      state.register.error = null;
    },
    logout: (state) => initialState
  }, 
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        console.log('loading')
        state.register.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('success')
        state.register.status = 'success';
        state.user.userEmail = action.payload;
        state.user.userName = action.payload;
        return console.log(state.user.userName)
      })
      .addCase(registerUser.rejected, (state, action) => {
        // console.log(action.payload)
        state.register.status = 'reject';
        state.register.error = action.payload as RegisterError[]
      })
      .addCase(loginUser.pending, (state, action) => {
        console.log('login loading');
        state.login.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('login success');
        state.login.status = 'success';
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('login error');
        state.login.error = action.error.message;
      })
  }
})

export const {login, logout, resetRegister} = loginSlice.actions;
export const selectUser = (state) => state.user.user;

export default loginSlice.reducer;