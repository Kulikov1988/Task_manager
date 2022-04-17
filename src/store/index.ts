import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import loginReducer from '../slices/loginReducer'
import nameReducer from '../slices/nameReducer'

const reducer = combineReducers({
  loginReducer,
  nameReducer
})

const store = configureStore({
  reducer,
})

export type AppState = ReturnType<typeof reducer>;

export default store;