import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../lib';
import { storeUserInfo } from '../services';
import Todo from './Todo';

function Login() {
  const [isReady, setIsReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setIsReady(true);
      setIsSignedIn(!!user);
      if (user) {
        storeUserInfo(user);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  if (!isReady) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className='column panel-block'>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <button className='button is-danger is-light is-small' onClick={() => firebase.auth().signOut()}>
        Sign-out
      </button>
      <Todo />
    </div>
  );
}

export default Login;
