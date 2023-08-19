import React, { useState,useRef } from 'react';
import { addTodo } from '../state/action-creators/index';
import { useDispatch } from 'react-redux';


function Input(props) {
  
  const [todos, setTodos] = useState(""); 
  const dispatch = useDispatch();

  const addToDoHandler = async (event) => {
    event.preventDefault();
    dispatch(addTodo(todos));

    setTodos("")

}
  const inputBox = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && todos.trim() !== "") {
      event.preventDefault();
      addToDoHandler(event);
    }
  };

  return (
    <div className='p-3 flex justify-around'>
      <form className='w-[100%]'>
        <input
          type="text"
          name="text"
          id="text"
          placeholder='Enter Data Here ...'
          className='p-2 pr-2 text-sm border-[#D70FC6] bg-[#FFE6FC] lg:w-[90%] w-[80%] focus:bg-[#FDF3FD] focus:outline-none blur:bg-[#FFE6FC] sm:p-3 border sm:text-xl'
          ref={inputBox}
          value={todos}
          onChange={(e) => setTodos(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className='flex justify-end -mt-10 pb-3 mb-3 sm:-mt-14 sm:pb-8 sm:mb-4 '>
        <div
        className='absolute cursor-pointer w-[40px] h-[40px] bg-[#D70FC6] text-white rounded-[100%] flex justify-center items-center sm:w-[50px] sm:h-[50px]'
        onClick={addToDoHandler}
      >
        <i className="fa-solid fa-plus sm:fa-2xl"></i>
      </div>
        </div>
        
      </form>
    </div>
  );
}

export default Input;




