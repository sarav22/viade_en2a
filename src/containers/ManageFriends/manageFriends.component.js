import React from 'react';
import ldflex from '@solid/query-ldflex';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';
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
  const { webId,friends} = props;
  const { t } = useTranslation();

  async function ldflexDeleter(friend){
     return ldflex[webId].knows.delete(ldflex[friend]);
  }

  async function deleteFriend(event, friend) {
    event.preventDefault();
    await ldflexDeleter(friend);
    await reload();
  }

  const reload = () => {
    window.location.reload(true);
  }
  
  async function viewRoutes(event, friend) {
    event.preventDefault();
    var url = friend.replace("https://", "")
    url = Base64.encode(url);
    browserHistory.push('/viade_en2a/#/friendRoutes/'+ url);
    await reload();
  }  

  return (
    <div data-testid="manageFriends-container">
      {
        friends.map(friend => (
        <div key={friend + "div"}>
        <Dropdown key={friend+"d"} style={{margin:'20px'}} as={ButtonGroup}>

          <ButtonFriend>
            <Button className="buttonFriend" variant="light" onClick={(event) => viewRoutes(event,friend)} data-testid={"buttonFriend"+friend}  key={"buttonFriend"+friend}>
              {friend}
            </Button>
          </ButtonFriend>
          <DropdownButton variant="light" key={friend+"dropdown"} title=""> 
            <Dropdown.Item target="_blank" href={friend} key={friend+"dropdownI1"}>{t('manageFriends.viewProfile')}</Dropdown.Item>
            <Dropdown.Item onClick={(event) => deleteFriend(event,friend)} key={friend+"dropdownI2"}>{t('manageFriends.delete')}</Dropdown.Item>
            <Dropdown.Item onClick={(event) => viewRoutes(event,friend)} key={friend+"dropdownI3"}>{t('manageFriends.viewRoutes')}</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        </div>
        ))
      }
      </div>
  );
};
