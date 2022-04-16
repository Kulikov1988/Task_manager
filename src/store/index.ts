import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import loginReducer from '../slices/loginReducer'
import signInReducer from '../slices/signInReducer'
import nameReducer from '../slices/nameReducer'

const reducer = combineReducers({
  loginReducer,
  signInReducer,
  nameReducer
})

const store = configureStore({
  reducer,
})

export type AppState = ReturnType<typeof reducer>;

export default store;