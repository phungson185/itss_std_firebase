import { useState, useEffect } from 'react';

import { getFirebaseItems, addFirebaseItems, updateFirebaseItems } from '../services';

export const useFirebaseStorage = () => {
  const [items, setItems] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setItems(await getFirebaseItems());
  }, []);

  const addTodo = async (item) => {
    await addFirebaseItems(item);
    setItems([...items, item]);
  };

  const updateTodo = async (item) => {
    await updateFirebaseItems(item);
    setItems(items.map((i) => (i.id === item.id ? item : i)));
  };

  return [items, addTodo, updateTodo];
};

// function useStorage() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const data = localStorage.getItem(STORAGE_KEY);

//     if (!data) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
//     } else {
//       setItems(JSON.parse(data));
//     }
//   }, []);

//   const putItems = items => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//     setItems  (items);
//   };

//   const clearItems = () => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
//     setItems([]);

//   };

//   return [items, putItems, clearItems];
// }

// export default useStorage;
