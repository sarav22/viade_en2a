import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {deleteFriend, viewRoutes } from '../../services/friendsManager';
import {
  ButtonFriend,
} from './manageFriends.style';
import { Base64 } from "js-base64";
import Button from 'react-bootstrap/Button';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const ManageFriendsContent = props => {
  const { webId, friends} = props;
  const { t } = useTranslation();

  return (
    <div data-testid="manageFriends-container">
      {
        friends.map(friend => (
        <div key={friend + "div"}>
        <Dropdown key={friend+"d"} data-testid={friend+"d"} style={{margin:'20px'}} as={ButtonGroup}>

        <ButtonFriend>
            <Button className="buttonFriend" variant="light" onClick={(event) => viewRoutes(event,friend)} style={{'padding-left': '1px'}} data-testid={"buttonFriend"+friend}  key={"buttonFriend"+friend}>
              {friend}
            </Button>
          </ButtonFriend>
          <DropdownButton variant="light" key={friend+"dropdown"} data-testid={friend+"dropdown"} title=""> 
            <Dropdown.Item target="_blank" href={friend} key={friend+"dropdownI1"} data-testid={friend+"dropdownI1"}>{t('manageFriends.viewProfile')}</Dropdown.Item>
            <Dropdown.Item onClick={(event) => deleteFriend(event,friend, webId)} key={friend+"dropdownI2"} data-testid={friend+"dropdownI2"}>{t('manageFriends.delete')}</Dropdown.Item>
            <Dropdown.Item onClick={(event) => viewRoutes(event,friend)} key={friend+"dropdownI3"} data-testid={friend+"dropdownI3"}>{t('manageFriends.viewRoutes')}</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        </div>
        ))
      }
      </div>
  );
};
