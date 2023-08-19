import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    editedItemId: null,
}

const todosSlice = createSlice({
    name : 'todos',
    initialState,
    reducers: {
        addNewTodo: (state, action) => {
            state.todos.push(action.payload)
        },

        // update todos reducer
        updateNewTodo: (state, action) =>{
            state.editedItemId = action.payload;
        },

        // stop Edting Item
        stopUpdateNewTodo: (state) => {
            state.editedItemId = null;
        },

        // Delete items
        deleteNewTodo: (state, action) => {
            const idToDelete = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== idToDelete);
        } 
    }
});

export const { addNewTodo,updateNewTodo, stopUpdateNewTodo, deleteNewTodo } = todosSlice.actions;

export default todosSlice.reducer;