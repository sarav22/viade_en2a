import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {deleteFriend, viewRoutes } from '../../services/friendsManager';
import {
  ManageFriendsWrapper,
  ButtonFriend,
} from './manageFriends.style';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const ManageFriendsContent = props => {
  const { webId, friends} = props;
  const { t } = useTranslation();

  return (
    <ManageFriendsWrapper data-testid="manageFriends-wrapper">
      {
        friends.map(friend => (
        <div key={friend + "div"}>
        <Dropdown key={friend+"d"} style={{margin:'20px'}} as={ButtonGroup}>

          <ButtonFriend variant="success" onClick={(event) => viewRoutes(event,friend)} width='20' data-testid={"buttonFriend"+friend}  key={"buttonFriend"+friend}>{friend}</ButtonFriend>
          <DropdownButton variant="light" key={friend+"dropdown"} title=""> 
            <Dropdown.Item target="_blank" href={friend} key={friend+"dropdownI1"}>{t('manageFriends.viewProfile')}</Dropdown.Item>
            <Dropdown.Item onClick={(event) => deleteFriend(event,friend, webId)} key={friend+"dropdownI2"}>{t('manageFriends.delete')}</Dropdown.Item>
            <Dropdown.Item onClick={(event) => viewRoutes(event,friend)} key={friend+"dropdownI3"}>{t('manageFriends.viewRoutes')}</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        </div>
        ))
      }
    </ManageFriendsWrapper>
  );
};
