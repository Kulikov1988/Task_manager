import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from './authReducer';

interface TaskProps {
  title: string;
  description: string;
  shortDescription: string;
  dueDate?: Date;
  id?: any;
  duration: number;
  status: string;
}

interface TaskError {
  field: string;
  message: string;
}

interface TaskState {
  tasks:{title: 'string', description: 'string', createdAt: Date, id?: any}[] ;
  status: 'idle' | 'loading' | 'reject' | 'success';
  error: null | TaskError[];
}

// interface TaskIdProps {
//   id: any;
// }

export const initialState: TaskState = {
  
  tasks: [],
  status : 'idle',
  error: null
}

export const fetchTasks = createAsyncThunk('tasks/get',
 async (_, thunkApi) => {
  try {
    const response = await axiosApi.get('/tasks')
    return response.data
    
  }
  catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
 }
)

export const createTask = createAsyncThunk('tasks/create', 
async ({title, description, duration, shortDescription, status, dueDate, } : TaskProps, thunkApi) => {
  try {
    
    const response = await axiosApi.post('/tasks', {
      title, description, duration, shortDescription, status, dueDate
    })
    
    thunkApi.dispatch(resetCreateTask())
    thunkApi.dispatch(fetchTasks())
    return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const deleteTask = createAsyncThunk('tasks/delete',
  async (id , thunkApi) => {
    try {
      const response = await axiosApi.delete(`tasks/${id}`,  )
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetCreateTask: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchTasks.pending, (state) => {
      state.status ='loading';
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'success';
      state.tasks = action.payload.tasks;
    })
    .addCase(fetchTasks.rejected, (state, action) => {
      state.status = 'reject';
      state.error = action.payload as TaskError[];
    })
    .addCase(createTask.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(createTask.fulfilled, (state) => {
      state.status = 'success';
    })
    .addCase(createTask.rejected, (state, action) => {
      state.status = 'reject';
      state.error = action.payload as TaskError[];
    })
    .addCase(deleteTask.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deleteTask.fulfilled, (state) => {
      state.status ='success';
    })
    .addCase(deleteTask.rejected, (state, action) => {
      state.status = 'reject';
      state.error = action.payload as TaskError[];
    } )
  }
})

export const {resetCreateTask} = taskSlice.actions;
  export default taskSlice.reducer;