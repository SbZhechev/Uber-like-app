import React from 'react';


function Request({request , ...props}) {

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
        </div>
    </div>

    );
};


export default Request;