import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { tasks } from './../components/Task/Tasks';

interface TaskProps {
  title: string,
  task: string
}

export const initialState = {
  tasks : [
    {
      title: 'Task1',
      date: new Date().toLocaleString(),
      task: 'do the first task today!',
    },
    {
      title: 'Task2',
      date: new Date().toLocaleString(),
      task: 'second task',
    },
    {
      title: 'Task3',
      date: new Date().toLocaleString(),
      task: 'third task',
    },
    {
      title: 'Task4',
      date: new Date().toLocaleString(),
      task: 'one more task',
    },
    {
      title: 'Task5',
      date: new Date().toLocaleString(),
      task: 'last task',
    },
    {
      title: 'Task6',
      date: new Date().toLocaleString(),
      task: 'the last task',
    },
  ]
  
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, {payload}: PayloadAction<TaskProps> ) => {
      state.tasks = initialState.tasks
    }
  }
})

export const {createTask} = taskSlice.actions;
export default taskSlice.reducer;