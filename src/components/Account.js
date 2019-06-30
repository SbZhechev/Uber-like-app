import React from 'react';
import '../Account.css';

function Account({account ,props}){
    return (
        <div id = 'accountInfo'>
            <figure>
                <img className = 'pic' src = {account.picture} alt = {account.username}></img>
                <figcaption>Your profile picture</figcaption>
            </figure>
            <div id = 'userInfo'>
                <p className = 'username'>Username: {account.username}</p>
                <p className = 'description'>description: {account.description}</p>
                <p className = 'gender'>Gender: {account.gender}</p>
            </div>
        </div>
    );
};


export default Account;