import { useState, useEffect } from 'react';
import firebase from 'firebase/compat';
import { uiConfig } from '../lib';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Login() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

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
      <button class="button is-danger is-light is-small" onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </div>
  );
}

export default Login;
