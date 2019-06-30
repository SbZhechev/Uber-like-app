import React, { useState } from 'react';


function RegisterForm({handleSubmit, ...props}) {

    const [newUser, setNewUser] = useState({});

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    return (
        <form id='register-form' onSubmit = {(e) => handleSubmit(e, newUser)}>
            <input type= 'text' name = 'name' placeholder= 'Name' required onChange = {(e) => handleChange(e)} />
            <input type= 'text' name  = 'username' placeholder= 'Username' required onChange = {(e) => handleChange(e)} /> 
            <input type= 'password' name = 'password' placeholder= 'Password' required onChange = {(e) => handleChange(e)} />
            <button type='submit'>Register</button>
        </form>
    );
};


export default RegisterForm;