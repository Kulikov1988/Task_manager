import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import { axiosApi } from './authReducer';

interface TaskProps {
  title: string;
  description: string;
  createdAt?: Date;
  id?: any;
}

interface TaskState {
  tasks:{title: 'string', description: 'string', createdAt: Date, id?: any}[] ;
  status: 'idle' | 'loading' | 'reject' | 'success'
}

interface TaskIdProps {
  id: any;
}

export const initialState: TaskState = {
  tasks: [],
  status : 'idle'
}

export const fetchTasks = createAsyncThunk('tasks/get',
 async (thunkApi) => {
  try {
    const response = await axiosApi.get('/tasks')
    return response.data
  }
  catch (error) {
    return console.log(error.response.data)
  }
 }
)

export const createTask = createAsyncThunk('tasks/create', 
async (thunkApi) => {
  try {
    const response = await axiosApi.post('/tasks')
    return response.data
  } catch (error) {
    console.log(error.response.data)
  }
}
)


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
    .addCase(fetchTasks.pending, (state) => {
      state.status ='loading';
      console.log('loading tasks')
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'success';
      console.log('fetch tasks');
      state.tasks = action.payload.tasks;
    })
    .addCase(fetchTasks.rejected, (state) => {
      state.status = 'reject';
      console.log('tasks error')
    })
  }
})

// export const {createTask, editDescription, deleteTask} = taskSlice.actions;
  export default taskSlice.reducer;