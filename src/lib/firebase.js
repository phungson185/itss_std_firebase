import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAwc-FEWW_eeLwKhSSxFms-0yiRkUGwXn8',
  authDomain: 'it-nihongo.firebaseapp.com',
  projectId: 'it-nihongo',
  storageBucket: 'it-nihongo.appspot.com',
  messagingSenderId: '169429472337',
  appId: '1:169429472337:web:42c8aac01e6fb54027d470',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
