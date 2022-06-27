import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

interface TaskProps {
  title: string;
  description: string;
  date?: Date;
  id?: any;
}

interface TaskIdProps {
  id: any;
}

export const initialState = {
  tasks : [
    {
      id: uuid(),
      title: 'Task1',
      date: new Date(),
      description: 'do the first task today!',
      
    },
    {
      id: uuid(),
      title: 'Task2',
      date: new Date(),
      description: 'second task',
        
    },
    {
      id: uuid(),
      title: 'Task3',
      date: new Date(),
      description: 'third task',      
      
    },
    {
      id: uuid(),
      title: 'Task4',
      date: new Date(),
      description: 'one more task',
     
    },
    {
      id: uuid(),
      title: 'Task5',
      date: new Date(),
      description: 'last task',
      
    },
    {
      id: uuid(),
      title: 'Task6',
      date: new Date(),
      description: 'the last task',
      
    },
  ]
  
}


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, {payload}: PayloadAction<TaskProps> ) => {
      state.tasks = [...state.tasks, {...payload, id: uuid(), date: payload.date}];
    },
    deleteTask: (state, {payload}: PayloadAction<TaskIdProps> ) => {
      const newState = state.tasks.filter(task => task.id !== payload.id)
      state.tasks = newState;
    },
    editDescription: (state, {payload}: PayloadAction<TaskProps> ) => {
     const editedState = state.tasks.map( task => {
       if (task.id === payload.id) {
         return {
           ...task,
           description: payload.description,
           title: payload.title,
           date: payload.date
         };
       } return {...task} 
     })
           state.tasks = editedState;
    }
  }
})

export const {createTask, editDescription, deleteTask} = taskSlice.actions;
  export default taskSlice.reducer;