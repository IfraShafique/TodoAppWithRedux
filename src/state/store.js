import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './reducers/todoReducer';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  }
});

export default store;
