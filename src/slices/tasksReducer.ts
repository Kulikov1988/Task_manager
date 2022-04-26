import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskProps {
  title: string,
  task: string
}

export const initialState = {
  title: '',
  date: new Date().toLocaleString(),
  task: ''
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, {payload}: PayloadAction<TaskProps> ) => {
      state.title = payload.title;
      state.task = payload.task;
    }
  }
})

export const {createTask} = taskSlice.actions;
export default taskSlice.reducer;