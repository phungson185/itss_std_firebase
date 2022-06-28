import { useState, useEffect } from 'react';

import { getFirebaseItems, addFirebaseItems, updateFirebaseItems, deleteFirebaseItems } from '../services';

export const useFirebaseStorage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const items = await getFirebaseItems();
      setItems(items);
    }
    fetchData();
  }, []);

  const addTodo = async (item) => {
    await addFirebaseItems(item);
    setItems([...items, item]);
  };

  const updateTodo = async (item) => {
    await updateFirebaseItems(item);
    setItems(items.map((i) => (i.id === item.id ? item : i)));
  };

  const deleteAllTodo = async () => {
    await Promise.all(items.map((i) => deleteFirebaseItems(i)));
    setItems([]);
  };

  return [items, addTodo, updateTodo, deleteAllTodo];
};
