import React from 'react';
import Request from './Request.js';
import '../Request.css';

function RequestsList({requests , ...props}){
    
    return  (
        requests.map((req,index) => (
            <Request key = {req._id} index = {index} request = {req} />
        )) 
    );
};


export default RequestsList;