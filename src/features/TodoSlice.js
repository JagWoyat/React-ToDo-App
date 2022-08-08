/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTodos = createAsyncThunk('/todo/todos', async () => {
  const response = await axios.get('http://localhost:5000/api/todos');
  return response.data;
});

export const addNewTodo = createAsyncThunk('todo/addNewTodo', async (initialPost) => {
  initialPost.status = 'todo';
  const response = await axios.post('http://localhost:5000/api/todos', initialPost);
  return response.data;
});

export const updateThunkTodo = createAsyncThunk('todo/updateTodo', async (payload) => {
  const response = await axios.patch(`http://localhost:5000/api/todos/${payload._id}`, {
    status: payload.status,
  });
  return response.data;
});

export const removeThunkTodo = createAsyncThunk('todo/removeTodo', async (payload) => {
  const response = await axios.delete(`http://localhost:5000/api/todos/${payload._id}`);
  return response.data;
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ ...action.payload, ...{ status: 'todo' } });
    },
    deleteTodo: (state, action) => {
      state.todos.map((todo) => {
        if (todo._id === action.payload._id) {
          (todo.status === 'todo' || todo.status === 'done') && (todo.status = 'deleted');
        }
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload._id);
    },
    restoreTodo: (state, action) => {
      state.todos.map((todo) => {
        if (todo._id === action.payload._id) {
          todo.status === 'deleted' && (todo.status = 'todo');
        }
      });
    },
    updateTodo: (state, action) => {
      state.todos.map((todo) => {
        if (todo._id === action.payload._id) {
          todo.status === 'todo'
            ? (todo.status = 'done')
            : todo.status === 'done' && (todo.status = 'todo');
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.todos = [
          {
            _id: '1',
            title: 'You are currently offline',
            content: "Any changes made won't last",
            status: 'todo',
          },
          {
            _id: '2',
            title: 'Connect your MongoDB databse',
            content: 'Put your link in /server/config.env',
            status: 'todo',
          },
        ];
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(updateThunkTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(removeThunkTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export default todoSlice.reducer;

export const selectTodo = (state) => state.todo.todos;
export const getTodosStatus = (state) => state.todo.status;
export const getTodosError = (state) => state.todo.error;

export const { addTodo, deleteTodo, restoreTodo, updateTodo, removeTodo } = todoSlice.actions;
