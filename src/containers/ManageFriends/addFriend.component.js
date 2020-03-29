import React from 'react';
import ldflex from '@solid/query-ldflex';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';
import {
  ManageFriendsWrapper,
} from './manageFriends.style';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const AddFriendsContent = props => {
  const { t } = useTranslation();

  
  const reload = () => {
    window.location.reload(true);
  }
  
  //Handles the submission of the webId of the user you want to add to the list of friends
  const submitHandler = (event) => {
    event.preventDefault();
    let userId = document.getElementById("webId").value;
    alert(userId);
  }

  return (
    <ManageFriendsWrapper data-testid="manageFriends-wrapper">
      {
        <form onSubmit={this.submitHandler}>
            <p>Enter the webID of the person you want to add as friend: </p>
            <input id="webId" type="text"/>
            <input type="submit" value="Add friend"/>
        </form>
      }
    </ManageFriendsWrapper>
  );
}