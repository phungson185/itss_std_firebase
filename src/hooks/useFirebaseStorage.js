import { useState, useEffect } from 'react';

import { getFirebaseItems, addFirebaseItems, updateFirebaseItems, deleteFirebaseItems } from '../services';

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

  const deleteAllTodo = async () => {
    await Promise.all(items.map((i) => deleteFirebaseItems(i)));
    setItems([]);
  }

  return [items, addTodo, updateTodo, deleteAllTodo];
};
