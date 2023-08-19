import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Input from './Components/InputField';
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Enteries from './Components/Enteries';
import { useDispatch } from 'react-redux'; // Import useDispatch


function App() {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch(); // Get the dispatch function

  // Fetch the data from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Items"), (snapshot) => {
      const todosData = snapshot.docs.map((doc) => {
        const timestamp = doc.data().timestamp;
        const formattedTimestamp = timestamp
          ? format(timestamp.toDate(), 'dd-MMM-yyyy')
          : '';

        return {
          id: doc.id,
          todo: doc.data().todos,
          timestamp: formattedTimestamp,
        };
      });


      // remove duplicate entries
      const uniqueTodosData = todosData.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.todo.toLowerCase() === item.todo.toLowerCase())
      );

      setTodos(uniqueTodosData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#350435] h-screen p-3 flex">
      <div className="w-[95%] h-[60vh] sm:w-[50%] sm:h-[80vh] shadow-2xl rounded bg-[#FFE6FC] m-auto">
        <h1 className="text-center font-bold text-white text-xl bg-[#913891] p-2 sm:text-2xl sm:p-3 xl:text-4xl">
          ToDo List
        </h1>
        {/* Pass the dispatch function to the Input component */}
        <Input todos={todos} dispatch={dispatch} />
        <Enteries data={todos} dispatch={dispatch}/>
      </div>
    </div>
  );
}

export default App;

