import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from '../slices/authReducer'
import taskReducer from '../slices/tasksReducer'

const reducer = combineReducers({
  authReducer,
  taskReducer
})

const store = configureStore({
  reducer,
})

export type AppState = ReturnType<typeof reducer>;

export default store;