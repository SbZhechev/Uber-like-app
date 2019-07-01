import React from 'react';


function Request({request, currentUser, ...props}) {

    let acceptRequest;
    if(currentUser.accountType === 'driver'){
        acceptRequest = <button id = 'takeRequest'>Take Request</button>
    }

    return (
    <div id = 'requestCard'>
        <div id = 'requestContent'>
            <img src = {request.userPic} alt = {request.user} ></img>
            <span id = 'requestInfo'>
                <p>Posted by: {request.user}</p>
                <p>From: {request.fromLocation}</p>
                <p>To: {request.toLocation}</p>
                <p>Distance: {request.distance}</p>
            </span>
            {acceptRequest}
        </div>
    </div>

    );
};


export default Request;