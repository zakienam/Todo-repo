import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../store/tasks/tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer, 
  },
})