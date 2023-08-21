import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../state/action-creators/index';
import { updateNewTodo, stopUpdateNewTodo } from '../state/reducers/todoReducer';

export default function Items(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(props.item);
  const dispatch = useDispatch();


  // Update Todos Function
  const handleEditSave = async () => {
    try {
      dispatch(updateTodo(props.id, editedItem))
      // dispatch(stopUpdateNewTodo());
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };


  // Delete todos function
  const handleDelete = async () => {
    dispatch(deleteTodo(props.id))
    // try {
    //   await deleteDoc(doc(db, "Items", props.id));
    // } catch (error) {
    //   console.error("Error deleting item: ", error);
    // }
  };

  // handle edit click function
  const handleEditClick = () => {
    if (!props.isEditing) {
      updateNewTodo(); // Toggle editing state
      setEditedItem(props.item); // Reset edited item to original item when clicking edit
    } else {
      stopUpdateNewTodo();
      setIsEditing(false) // Reset edited item to original item when clicking edit
       // Toggle editing state
    }
  };
  

  // const handleEditClick = () => {
  //   dispatch(updateNewTodo(props.id))
  //   setIsEditing(true); // Toggle the isEditing state to true when clicking on the edit icon
  // };

  // update the list when click on Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEditSave(); // Invoke addToDoHandler with the event object
    }
  };

  // For format the date
  const formattedDate = props.time;

  return (
  <div
    onClick={() => setIsEditing(!isEditing)} // Toggle isEditing state on each click
    className={`select-none cursor-pointer w-full border-b text-sm sm:text-xl rounded bg-[#F685EE] mb-1 sm:mb-2 p-2 sm:p-3 flex justify-between overflow-auto hover:shadow-md ${isEditing ? 'bg-[#F685EE]' : ''}`}
  >
    {/* ***Left*** */}
    {isEditing ? (
      // Active the editing input field when click on edit button
      <input
        type="text"
        className='text-xs bg-[#F685EE] outline-none sm:text-[1rem] text-black sm:[80%] xl:w-[90%] w-[80%]'
        value={editedItem}
        onChange={(e) => setEditedItem(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    ) : (
      <div className='text-xs sm:text-[1rem] text-black sm:[80%] xl:w-[90%] w-[80%]'>
        <span className='mr-2 text-[#000000] font-semibold'>
          {/* call the date */}
          {formattedDate}
        </span>
        <span>
          {/* {editedItem} */}
          {props.item}
        </span>
      </div>
    )}

    {/* ****Right**** */}
    <div className='md:mr-4 inline'>
      {isEditing ? (
        <span>
          <i
            className='fa-regular fa-check-square fa-sm text-[#00C853] hover:text-black'
            onClick={handleEditSave}
          ></i>
        </span>
      ) : (
        <span className='bg-[#F685EE]'>
          <i
            className='fa-regular fa-pen-to-square fa-sm sm:text-[#D70FC6] text-white hover:text-black'
          ></i>
        </span>
      )}
      &nbsp;&nbsp;
      <i
        className='fa-regular fa-trash-can sm:fa-2xl text-sm sm:text-[#D70FC6] text-white hover:text-black'
        onClick={handleDelete}
      ></i>
    </div>
  </div>
);

}
