import React, { useState, useEffect } from 'react';
import Items from './Items';

export default function Enteries(props) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sort the data when the component renders or when props.data changes
    const sortedItems = [...props.data].sort((a, b) => {
      const itemA = a.todo ? a.todo.toLowerCase() : ''; // Handle possible undefined values
      const itemB = b.todo ? b.todo.toLowerCase() : ''; // Handle possible undefined values
      return itemA.localeCompare(itemB);
    });
    setSortedData(sortedItems);
  }, [props.data]);

  const items = sortedData.map((singleData) => {
    const capitalizeCase = singleData.todo
      ? singleData.todo.charAt(0).toUpperCase() + singleData.todo.slice(1)
      : '';

    const timestampString = singleData.timestamp
      ? singleData.timestamp.toString()
      : '';

    return (
      <Items
        removeHandler={() => props.removeHandler(singleData.id)}
        updateTodo={props.updateTodo}
        key={singleData.id}
        id={singleData.id}
        item={capitalizeCase}
        time={timestampString}
        isEditing={singleData.id === props.editedItemId}
        editedItem={props.editedItem}
        updateNewTodo={() => props.updateNewTodo(singleData.id)}
        stopUpdateNewTodo={props.stopUpdateNewTodo}
        dispatch={props.dispatch} // Pass the dispatch function
      />
    );
  });

  return (
    <div className='p-3'>
      <div className='max-h-[30vh] sm:max-h-[50vh] overflow-y-auto'>
        <ul className='mt-4 '>{items}</ul>
      </div>
    </div>
  );
}




// import React, { useState, useEffect } from 'react';
// import Items from './Items';

// export default function Enteries(props) {
//   const [sortedData, setSortedData] = useState([]);

//   useEffect(() => {
//     // Sort the data when the component renders or when props.data changes
//     const sortedItems = [...props.data].sort((a, b) =>
//       a.item.localeCompare(b.item)
//     );
//     setSortedData(sortedItems);
//   }, [props.data]);

//   return (
//     <div className='p-3'>
//       <div className='max-h-[30vh] sm:max-h-[50vh] overflow-y-auto'>
//         <ul className='mt-4 '>
//           {sortedData.map((singleData) => (
//             <Items
//               removeHandler={props.removeHandler}
//               updateTodo={props.updateTodo}
//               key={singleData.id}
//               id={singleData.id}
//               item={singleData.todo}
//               time={singleData.timestamp}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }




// import React, {useState, useEffect} from 'react'
// import Items from './Items'

// export default function Enteries(props) {
//   const [sortedData, setSortedData] = useState([]);

//   useEffect(() => {
//     // Sort the data when the component renders or when props.data changes
//     const sortedItems = [...props.data].sort((a, b) =>
//       a.item.localeCompare(b.item)
//     );
//     setSortedData(sortedItems);
//   }, [props.data]);

//   const items = sortedData.map((singleData) => {
//     const capitalizeCase =
//       singleData.item.charAt(0).toUpperCase() + singleData.item.slice(1);

//     return (
//       <Items
//         removeHandler={props.removeHandler}
//         updateTodo={props.updateTodo}
//         key={singleData.id}
//         id={singleData.id}
//         item={capitalizeCase}
//         time={singleData.time}
//       />
//     );
//   });

//   return (
//     <div className='p-3'>
//       <div className='max-h-[30vh] sm:max-h-[50vh] overflow-y-auto'>
//         <ul className='mt-4 '>{items}</ul>
//       </div>
//     </div>
//   );
// }



