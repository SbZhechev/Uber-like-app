import React, { useState } from 'react';


function LoginForm({handleSubmit, ...props}){

    const [currentUser, setCurrentUser] = useState({});

    function handleChange(event){
        const target = event.target;
        const value = target.value;
        setCurrentUser({username:value});
    }

    function handlePassChange(event){
        const target = event.target;
        const value = target.value;
        setCurrentUser({...currentUser, password: value});
    }

    return (

        <form id='login-form' onSubmit = {(e) => handleSubmit(e, currentUser)}>
            <input type= 'text' placeholder= 'Username' required  onInput = {(e) => handleChange(e)}/>
            <input type= 'password' placeholder= 'Password' required onChange = {(e) => handlePassChange(e)}/>
            <button type= 'submit'>Login</button>
        </form>
    );
};

export default LoginForm;