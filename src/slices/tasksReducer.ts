import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from './authReducer';

export interface TaskProps {
  title: string;
  description: string;
  shortDescription: string;
  dueDate?: Date;
  id?: any;
  duration: number;
  status: 'UPCOMING' | 'DONE' | 'CANCELED';
}

interface TaskError {
  field: string;
  message: string;
}

interface TaskDates {
  dates: []
}

interface TheTaskDay {
  dateWithTasks: string;
  offset: number;
}

interface TaskState {
  tasks:TaskProps[] ;
  status: 'idle' | 'loading' | 'reject' | 'success';
  error: null | TaskError[];
  dates: TaskDates[];
}


export const initialState: TaskState = {
  tasks: [],
  status : 'idle',
  error: null,
  dates: []
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

export const editTask = createAsyncThunk('tasks/edit', 
async ({title, description, duration, shortDescription, status, dueDate, id } : TaskProps, thunkApi) => {
  try {
    
    const response = await axiosApi.put(`/tasks/${id}`, {
      title, description, duration, shortDescription, status, dueDate, id
    })
    
    thunkApi.dispatch(resetCreateTask())
    thunkApi.dispatch(fetchTasks())
    return console.log(response.status);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const deleteTask = createAsyncThunk('tasks/delete',
  async (id: string, thunkApi) => {
    try {
      const response = await axiosApi.delete(`tasks/${id}`)
      thunkApi.dispatch(fetchTasks())
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const getDatesTask = createAsyncThunk('tasks/getdates', 
  async (_, thunkApi) => {
    try {
      const response = await axiosApi.get('tasks/dates/')
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  } 
) 

export const getDayTasks = createAsyncThunk('tasks/getday',
async ({dateWithTasks, offset}:TheTaskDay, thunkApi) => {
  try {
    const response = await axiosApi.get(`/tasks/tasks-by-day`,{
      params: {
        date: dateWithTasks,
        TZOffset: offset
      }
    })
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(console.log(error.response.data))
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
    },
    resetEditTask: (state) => {
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
    .addCase(editTask.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(editTask.fulfilled, (state) => {
      state.status='success';
    })
    .addCase(editTask.rejected, (state, action) => {
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
    })
    .addCase(getDatesTask.fulfilled, (state, action) => {
      state.status = 'success';
      state.dates = action.payload.dates;
    })
    .addCase(getDatesTask.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getDatesTask.rejected, (state, action) => {
      state.status = 'reject';
      state.error = action.payload as TaskError[];
    })
    .addCase(getDayTasks.fulfilled, (state, action) => {
      state.status = 'success';
      state.tasks = action.payload.tasks;
    })
    .addCase(getDayTasks.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getDayTasks.rejected, (state, action) => {
      state.status = 'reject';
      state.error = action.payload as TaskError[];
    })
  }
})

export const {resetCreateTask, resetEditTask} = taskSlice.actions;
  export default taskSlice.reducer;