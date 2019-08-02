import React, { useState } from 'react';

function EditAccount({handleSubmit, currentUser, ...props}){
    const [editedUser, setEditedUser] = useState(currentUser);

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    return (
        <form id = 'editForm' onSubmit = {(e) => handleSubmit(e, editedUser)}>
            <h3>Edit Account</h3>
            <input type= 'text' name = 'username' placeholder= 'Username' onChange = {(e) => handleChange(e)}/> <br></br>
            <input type= 'text' name = 'gender' placeholder= 'Gender' onChange = {(e) => handleChange(e)}/> <br></br>
            <input name  = 'description' placeholder= 'Description'  form = 'editForm'onChange = {(e) => handleChange(e)}/> <br></br>
            <button type='submit'>Apply</button>
        </form>
    );
};


export default EditAccount;