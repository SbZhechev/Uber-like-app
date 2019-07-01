import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './components/HomePage.js';
import RegisterPage from './components/RegisterPage.js';
import './HomePage.css';

function App() {

  const [user, setUser] = useState({});

  function createAccount(e,account){
    e.preventDefault();
    axios.post('http://localhost:9000/api/accouts', account);
  };

  function logoutUser (){
    setUser({});
  };

  function loginUser (user){
    setUser(user);
  };

  return (
    <div className="App">
      {
        (user.username) ? 
        (<HomePage  user = {user} logoutUser = {logoutUser} loginUser = {loginUser}/>)
        :
        (<RegisterPage createAccount = {createAccount} loginUser = {loginUser}/>)
      }
    </div>
  );
}

export default App;
