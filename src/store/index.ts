import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from '../slices/authReducer'
import taskReducer from '../slices/tasksReducer'
import {
   persistStore,
   persistReducer,
   FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, authReducer)


const reducer = combineReducers({
  authReducer: persistedReducer,
  taskReducer,
  
})



const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, 
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    
  })
})

export type AppState = ReturnType<typeof reducer>;

export const persistor = persistStore(store);
export default store;