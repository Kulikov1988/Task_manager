import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskProps {
  title: string;
  description: string;
  date: Date;
  id?: number;
}

export const initialState = {
  tasks : [
    {
      title: 'Task1',
      date: new Date(),
      description: 'do the first task today!',
      id: 1,
    },
    {
      title: 'Task2',
      date: new Date(),
      description: 'second task',
      id: 2,  
    },
    {
      title: 'Task3',
      date: new Date(),
      description: 'third task',      
      id: 3,
    },
    {
      title: 'Task4',
      date: new Date(),
      description: 'one more task',
      id: 4,
    },
    {
      title: 'Task5',
      date: new Date(),
      description: 'last task',
      id: 5,
    },
    {
      title: 'Task6',
      date: new Date(),
      description: 'the last task',
      id: 6,
    },
  ]
  
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, {payload}: PayloadAction<TaskProps> ) => {
      state.tasks = [...state.tasks, {...payload, id: state.tasks.length + 1}];
      console.log(payload)
    },
    deleteTask: (state, {payload}: PayloadAction<TaskProps> ) => {

    },
    editDescription: (state, {payload} ) => {
      console.log(payload);
      
    }
  }
})

export const {createTask, editDescription, deleteTask} = taskSlice.actions;
  export default taskSlice.reducer;