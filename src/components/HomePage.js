import React, { useState } from 'react';
import Account from './Account.js';
import RequetsList from './RequestsList.js'
import axios from 'axios';


function HomePage({user, ...props}){

    const [panel, setPanel] = useState();
    const [content, setContent] = useState([]);
    let body;

    function handleClick(event){
        setPanel(event.target.name);
    }
    const getRequests = async () => {
        const result = await axios(`http://localhost:9000/api/requests`);
        setContent(result.data);
      };

    const getAccounts = async () => {
        const result = await axios(`http://localhost:9000/api/accounts`);
        setContent(result.data);
    };
    // const getDrivers = async () => {
    //     const result = await axios(`http://localhost:9000/api/drivers`);
    //     setContent(result.data);
    //     console.log(result.data);
    // };


    switch(panel){
        case 'account':
            body = <Account account = {user}/>;
            break;
        case 'drivers':
            body = <h1>Todo drivers list</h1>;
            break;
        case 'requests':
            body = <div id = 'requestsList'>
                    <div id = 'listHeader'>
                        <h2>Active requests:</h2>
                        <button>New request</button>
                    </div>
                    <RequetsList  requests = {content} />
                </div>;
            break;
        default:
            body = <h1>Welcome back!</h1>;
    };

    return (
        <div className = 'homePage'>
           <header id = 'homeHeader'>
                <span>
                    <h3>{user.username}</h3>
                </span>
                <span id = 'statistics'>
                    <span>Requests: 0</span>
                    <span>Followers: 0</span>
                    <span>Rating: 0</span>
                </span>
               <div id = 'navbar'>
                    <div className = 'links' onClick = {(e) => { e.target.name = 'account'; handleClick(e); getAccounts();}}>
                        Account
                    </div>
                    <div className = 'links' onClick = {(e) => { e.target.name = 'requests'; handleClick(e); getRequests();}}>
                        Requests
                    </div>
                    <div className = 'links' onClick = {(e) => { e.target.name = 'drivers'; handleClick(e)}}>
                        Drivers
                    </div>
                    <div className = 'links' onClick = {() => props.logoutUser()}>
                        Logout
                    </div>
                </div>
           </header>
           <div id = 'content'>
                {body}
           </div>
        </div>
    );
};


export default HomePage;