import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskProps {
  title: string;
  task: string;
  date: Date;
  checked: boolean;
}

export const initialState = {
  tasks : [
    {
      title: 'Task1',
      date: new Date(),
      task: 'do the first task today!',
      checked: false,
    },
    {
      title: 'Task2',
      date: new Date(),
      task: 'second task',
      checked: false,
    },
    {
      title: 'Task3',
      date: new Date(),
      task: 'third task',      
      checked: false,
    },
    {
      title: 'Task4',
      date: new Date(),
      task: 'one more task',
      checked: false,
    },
    {
      title: 'Task5',
      date: new Date(),
      task: 'last task',
      checked: false,
    },
    {
      title: 'Task6',
      date: new Date(),
      task: 'the last task',
      checked: false,
    },
  ]
  
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, {payload}: PayloadAction<TaskProps> ) => {
      // state.tasks = initialState.tasks;
      state.tasks = [...state.tasks, {...payload}];
      console.log(payload)
    },
    deleteTask: (state, {payload}: PayloadAction<TaskProps> ) => {

    },
   
  }
})

export const {createTask} = taskSlice.actions;
  export default taskSlice.reducer;