import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig } from '../lib';
import { storeUserInfo, updateUser } from '../services';
import Todo from './Todo';
import Upload from './UpLoad';

function Login() {
  const [isReady, setIsReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      setIsReady(true);
      setIsSignedIn(!!user);
      if (user) {
        setUser(await storeUserInfo(user));
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

  const handleImageChanged = async (downloadUrl) => {
    await updateUser(user, downloadUrl);
  };

  return (
    <>
      <div className='columns'>
        <Upload className='column' userImage={user.image} onSelectedImage={handleImageChanged} />
        <p className='column'>{firebase.auth().currentUser.displayName}</p>
        <button className='column button is-danger is-1' onClick={() => firebase.auth().signOut()}>
          Sign-out
        </button>
      </div>
      <Todo />
    </>
  );
}

export default Login;
