import React from 'react';
import '../Account.css';

function Account({account ,props}){
    return (
        <li key = {account._id}>
            <img className = 'pic' src = {account.picture} alt = {account.username}></img>
            <div id = 'userInfo'>
                <p className = 'username'>Username: {account.username}</p>
                <p className = 'description'>description: {account.description}</p>
                <p className = 'gender'>Gender: {account.gender}</p>
            </div>
        </li>
    )
};


export default Account;