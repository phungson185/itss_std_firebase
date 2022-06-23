import { useEffect, useState } from 'react';
import { storeUserInfo } from './services';
import { auth } from './lib';
import Login from './components/Login';
import Todo from './components/Todo';
import './styles/main.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      let newUser;
      if (user) {
        newUser = await storeUserInfo(user);
      }
      setUser(newUser);
      setLoading(false);
    });
  }, []);

  return (
    <div className='container is-fluid'>
      <header class='navbar'>{loading ? <p>LOADING.....</p> : <Login />}</header>
      <div>{user && <Todo />}</div>
    </div>
  );
}

export default App;
