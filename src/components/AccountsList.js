import React from 'react';
import Account from './Account.js';
//import { ListGroup, ListGroupItem } from 'reactstrap';

function AccountsList(props){
    return (
        <ul>
            {
                props.accounts.map((acc,index) => (
                    <Account key = {acc._id} index = {index} account = {acc} />
                )) 
            }
        </ul>
      );   
};


export default AccountsList;