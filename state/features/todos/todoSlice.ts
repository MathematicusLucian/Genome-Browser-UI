import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoType } from './types'

interface TodoState {
  todos: TodoType[]
  status: string // 'idle' | 'loading' | 'finished' | 'error',
  msg: string
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  msg: ''
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    fetchTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload
    },
    addTodo: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload
    },
    editTodo: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload
    },
    removeTodo: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload
    },
    updateStatus: (
      state,
      action: PayloadAction<{ status: string; msg: string }>
    ) => {
      state.status = action.payload.status
      state.msg = action.payload.msg
    }
  }
})

// export const todoActions = todoSlice.actions
export const {fetchTodos, addTodo, editTodo, removeTodo, updateStatus} = todoSlice.actions;
// export const todoReducer = todoSlice.reducer;
export default todoSlice.reducer;
// export default todoReducer