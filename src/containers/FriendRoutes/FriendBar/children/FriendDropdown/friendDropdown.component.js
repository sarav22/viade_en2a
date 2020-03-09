import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FriendDropdown = props => {

    const { friendWebId } = props;
    
    return (
        
        <DropdownButton variant="light" id="dropdown-basic-button" title="">
            <Dropdown.Item target="_blank" href={friendWebId}>View Profile</Dropdown.Item>
            <Dropdown.Item >Delete Friend</Dropdown.Item>
        </DropdownButton>
  
    );
  
};

export default FriendDropdown;