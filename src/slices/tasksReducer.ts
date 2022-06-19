import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskProps {
  title: string;
  description: string;
  date?: Date;
  id?: number;
}

interface TaskIdProps {
  id: number;
}

export const initialState = {
  tasks : [
    {
      id: 1,
      title: 'Task1',
      date: new Date(),
      description: 'do the first task today!',
      
    },
    {
      id: 2,
      title: 'Task2',
      date: new Date(),
      description: 'second task',
        
    },
    {
      id: 3,
      title: 'Task3',
      date: new Date(),
      description: 'third task',      
      
    },
    {
      id: 4,
      title: 'Task4',
      date: new Date(),
      description: 'one more task',
     
    },
    {
      id: 5,
      title: 'Task5',
      date: new Date(),
      description: 'last task',
      
    },
    {
      id: 6,
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
      state.tasks = [...state.tasks, {...payload, id: state.tasks.length + 1, date: payload.date}];
      console.log(payload)
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
         };
       } return {...task}
     })
      
      state.tasks = editedState;
    }
  }
})

export const {createTask, editDescription, deleteTask} = taskSlice.actions;
  export default taskSlice.reducer;