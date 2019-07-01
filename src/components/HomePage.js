import React, { useState } from 'react';
import Account from './Account.js';
import RequetsList from './RequestsList.js'
import axios from 'axios';


function HomePage({user, loginUser, ...props}){

    const [panel, setPanel] = useState();
    const [content, setContent] = useState([]);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [newRequest, setNewRequest] = useState({});
    let body;

    function handleClick(event){
        setPanel(event.target.name);
    }

    const getRequests = async () => {
        const result = await axios(`http://localhost:9000/api/requests`);
        setContent(result.data);
    };

    function handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setNewRequest({
            ...newRequest,
            [name]: value,
        });
    }

    function createRequest(event){
        event.preventDefault();
        const formatedRequest = {...newRequest};
        formatedRequest.user = user.name;
        formatedRequest.userPic = user.picture;
        formatedRequest.distance = '' + (3 + user.name.length);
        axios.post(`http://localhost:9000/api/requests/${user._id}`, formatedRequest)
        .then(() =>{
            getRequests();
            setShowRequestForm(false);
        });

    };
    // const getAccounts = async () => {
    //     const result = await axios(`http://localhost:9000/api/accounts`);
    //     setContent(result.data);
    // };
    // const getDrivers = async () => {
    //     const result = await axios(`http://localhost:9000/api/drivers`);
    //     setContent(result.data);
    //     console.log(result.data);
    // };


    switch(panel){
        case 'account':
            body = <Account account = {user} updateUser = {loginUser}/>;
            break;
        case 'drivers':
            body = <h1>Todo drivers list</h1>;
            break;
        case 'requests':
            body = <div id = 'requestsList'>
                    <div id = 'listHeader'>
                        <h2>Active requests:</h2>
                        <button id = 'createRequest' onClick = {(e) => {e.preventDefault(); setShowRequestForm(true)}}>New request</button>
                    </div>
                    <RequetsList  requests = {content} currentUser = {user}/>
                </div>
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
                    <span>
                        <strong>
                            Requests: 0
                            Followers: 0
                            Rating: 0
                        </strong>
                    </span>
                </span>
               <div id = 'navbar'>
                    <div className = 'links' onClick = {(e) => { e.target.name = 'account'; handleClick(e);}}>
                        <strong>Account</strong>
                    </div>
                    <div className = 'links' onClick = {(e) => { e.target.name = 'requests'; handleClick(e); getRequests();}}>
                        <strong>Requests</strong>
                    </div>
                    <div className = 'links' onClick = {(e) => { e.target.name = 'drivers'; handleClick(e)}}>
                        <strong>Drivers</strong>
                    </div>
                    <div className = 'links' onClick = {() => props.logoutUser()}>
                        <strong>Logout</strong>
                    </div>
                </div>
           </header>
           <div id = 'content'>
                {body}
                {showRequestForm &&
                    <form id = 'editForm' onSubmit = {(e) => createRequest(e)}>
                        <label onClick = {() => {setShowRequestForm(false)}}>&times;</label>
                        <input type= 'text' name = 'fromLocation' placeholder= 'From' onChange = {(e) => handleChange(e)} required/> <br></br>
                        <input type= 'text' name = 'toLocation' placeholder= 'To' onChange = {(e) => handleChange(e)} required/> <br></br>
                        <input type= 'text' name = 'price' placeholder= 'Price' onChange = {(e) => handleChange(e)}/><br></br>
                        <button type='submit'>Post request</button>
                    </form>
                }
           </div>
        </div>
    );
};


export default HomePage;