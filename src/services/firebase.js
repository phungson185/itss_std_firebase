import { db } from '../lib';

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db.collection('todos').get();
    const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return items;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addFirebaseItems = async (item) => {
  try {
    await db.collection('todos').add(item);
  } catch (error) {
    console.log(error);
  }
};

export const updateFirebaseItems = async (item) => {
  try {
    await db
      .collection('todos')
      .doc(item.id)
      .update(item);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFirebaseItems = async (item) => {
  try {
    await db
      .collection('todos')
      .doc(item.id)
      .delete();
  } catch (error) {
    console.log(error);
  }
};

export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db
    .collection('users')
    .doc(uid)
    .get();
  if (!userDoc.exists) {
    await db
      .collection('users')
      .doc(uid)
      .set({ name: user.displayName });
    return {
      name: user.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
};
