import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: []
}

export const tasksSlice = createSlice({ 
  name: 'tasks',
  initialState,
  reducers: { 
    initTodo: (state, action) => {
      state.tasks = action.payload;
    },    
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    },  
    removeTodo: (state, action) => {
      //id = action.payload
      let arr = [...state.tasks];
      arr = arr.filter(x => {
        if(x.id === action.payload)
          return false;
        else
          return true;
      });
      state.tasks = [...arr];
    },
    editTodo: (state, action)=>{
      //id = action.payload.id
      let arr = [...state.tasks];
      arr = arr.map(x => {
        if(x.id === action.payload.id)
          return {
            ...action.payload
          };
        else
          return x;
      });
      state.tasks = [...arr];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, editTodo, initTodo } = tasksSlice.actions

export default tasksSlice.reducer