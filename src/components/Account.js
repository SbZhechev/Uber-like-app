import React from 'react';
import '../Account.css';

function Account({account ,props}){
    return (
        <div id = 'accountInfo'>
            <div id = 'currentData'>
                <figure>
                    <img className = 'pic' src = {account.picture} alt = {account.username}></img>
                    <figcaption><h3><strong>{account.name}({account.username})</strong></h3></figcaption>
                </figure>
                <div id = 'userInfo'>
                    <p id = 'username'>Username: {account.username}</p>
                    <p id = 'description'>Description: {account.description}</p>
                    <p id = 'gender'>Gender: {account.gender}</p>
                    <button>Edit account</button>
                </div>
            </div>
        </div>
    );
};


export default Account;