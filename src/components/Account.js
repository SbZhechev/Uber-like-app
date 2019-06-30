import React, { useState } from 'react';
import '../Account.css';
import EditAccount from './EditAccount';
import axios from 'axios';

function Account({account , ...props}){
    const [showEditForm, setShowEditForm] = useState(false);
    function handleShowForm() {
        setShowEditForm(true);
    };

    function editAccount(event, editedUser){
        event.preventDefault();
        axios.put(`http://localhost:9000/api/accounts/${account._id}`, editedUser);
        setShowEditForm(false);
    };

    let driverButton;
    if(account.accountType === 'user'){
        driverButton = <button onClick = {(e) => {
            const newAccount = {...account};
            delete newAccount._id;
            editAccount(e,{...newAccount, accountType: 'driver'});
        }}>Become driver</button>;
    };

    return (
        <div id = 'accountInfo'>
            <div id = 'currentData'>
                <figure>
                    <img className = 'pic' src = {account.picture} alt = {account.username}></img>
                    <figcaption><h3><strong>{account.name}({account.username})</strong></h3></figcaption>
                </figure>
                <div id = 'userInfo'>
                    <p id = 'username'>Username: {account.username}</p>
                    <p id = 'gender'>Gender: {account.gender}</p>
                    <p id = 'description'>Description: {account.description}</p>
                    <p id = 'regDate'>Registration date: {account.registrationDate}</p>
                    <p id = 'lastModified'>Last modified: {account.lastModified}</p>
                    <p id = 'accStatus'>Account status: {account.accountStatus}</p>
                    <p id = 'accType'>Account type: {account.accountType}</p>
                    <button onClick = {handleShowForm}>Edit account</button>
                    {driverButton}
                </div>
                {
                        showEditForm && <EditAccount handleSubmit = {editAccount}/>
                }
            </div>
        </div>
    );
};


export default Account;