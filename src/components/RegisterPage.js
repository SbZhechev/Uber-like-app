import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';
import '../RegisterPage.css';

function RegisterPage({loginUser , ...props}){

    const [showForm, setShow] = useState('login');

    function handleClick(form) {
        setShow(form);
    };

    function handleLogin(event, user){
        event.preventDefault();
        const fetchData = async () => {
            const result = await axios(`http://localhost:9000/api/accounts/getUser/${user.username}/${user.password}`)
            .catch(error => {
                alert('Wrong credentials!');
                throw error;
            });
            loginUser(result.data);
          };
        fetchData();
    }

    function handleRegister(event ,user){
        event.preventDefault();
        const newAccount = {...user, accountType: "user", accountStatus: "active"};
        axios.post('http://localhost:9000/api/accounts', newAccount);

        setShow('login');
    };


    return (
        <div className = 'registerPage'>
            <header id = 'registerHeader'>
                <h1>Welcome to My-Uber!</h1>
            </header>
            <div id = 'buttons'>
                <button onClick = { () => {
                    handleClick('login');
                }}>Login</button>
                <button onClick = { () => {
                    handleClick('register');
                }}>Register</button>
            </div>
            {
                (showForm === 'login') ? 
                ( <LoginForm  handleSubmit = {handleLogin} /> ) : ( <RegisterForm handleSubmit = {handleRegister} /> )
            }
        </div>
    );
};

export default RegisterPage;