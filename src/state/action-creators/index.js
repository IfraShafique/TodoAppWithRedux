import { collection, query } from 'firebase/firestore';
import { addNewTodo, stopUpdateNewTodo,deleteNewTodo } from '../reducers/todoReducer';
import { db } from "../../firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import {  where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Add action creator Todo Function
export const addTodo = (todos) => async (dispatch) => {
    const trimmedTodo = todos.trim()

    if(trimmedTodo !== ""){
        const todoExistsQuery = query(collection(db, "Items"), where("todos","==",trimmedTodo));
        const snapshot = await getDocs(todoExistsQuery);
    
    if (snapshot.empty) {
        await addDoc(collection(db, "Items"), {
          todos: todos.trim(),
          timestamp: serverTimestamp(),
        });

        // Dispatch the action to add todo to Redux store
        dispatch(addNewTodo(trimmedTodo));

        
      } else {
        console.log("Todo already exists:", trimmedTodo);
      }
}
};


// For updating todos action creator
export const updateTodo = (id, editedItem) => async (dispatch)=> {
  try{
    await updateDoc(doc(db, "Items", id), {
      todos: editedItem,
      timestamp: serverTimestamp(),
    });  
    dispatch(stopUpdateNewTodo());
  }
  catch (error){
    console.log("Error Found in Updaing Function", error);
  }
}

// For Delete Todos action creator
export const deleteTodo = (id) => async(dispatch) => {
  try {
    await deleteDoc(doc(db, "Items", id));
    dispatch(deleteNewTodo());
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
}