import React from 'react';
import ldflex from '@solid/query-ldflex';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {
  ManageFriendsWrapper,
  ManageFriendsCard,
  ButtonFriend,
  ButtonDropdown
} from './manageFriends.style';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const ManageFriendsContent = props => {
  const { webId,friends} = props;

  async function ldflexDeleter(friend){
     return ldflex[webId].knows.delete(ldflex[friend]);
  }
  async function deleteFriend(event, friend) {
    event.preventDefault();
    ldflexDeleter(friend);
    //reload the friends list
  }
  
  async function viewRoutes(event, friend) {
    event.preventDefault();
    //redirect to friend routes
  }  

  return (
    <ManageFriendsWrapper data-testid="manageFriends-wrapper">
      <ManageFriendsCard>
      {
        friends.map(friend => (
          <div><Dropdown as={ButtonGroup}>
          <ButtonFriend id="t" variant="success"  onClick={(event) => viewRoutes(event,friend)} width='20' >{friend}</ButtonFriend>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" >🠻</Dropdown.Toggle>
            <Dropdown.Menu>
              <div><Dropdown.Item href={friend}><ButtonDropdown>View profile</ButtonDropdown></Dropdown.Item></div>
              <div><Dropdown.Item onClick={(event) => deleteFriend(event,friend)}><ButtonDropdown>Delete</ButtonDropdown></Dropdown.Item></div>
              <div><Dropdown.Item onClick={(event) => viewRoutes(event,friend)}><ButtonDropdown>View routes</ButtonDropdown></Dropdown.Item></div>
            </Dropdown.Menu>
        </Dropdown></div>
        ))
      }
      </ManageFriendsCard>
    </ManageFriendsWrapper>
  );
};