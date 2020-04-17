import React from 'react';
import ldflex from '@solid/query-ldflex';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const SearchFriendsContent = props => {
  const { webId,searchResults} = props;
  const { t } = useTranslation();

  async function ldflexDeleter(friend){
     return ldflex[webId].knows.delete(ldflex[friend]);
  }
  async function deleteFriend(event, friend) {
    event.preventDefault();
    ldflexDeleter(friend);
    await reload();
  }

  const reload = () => {
    window.location.reload(true);
  }
  
  async function viewRoutes(event, friend) {
    event.preventDefault();
    const f = friend.toString().substring(8).split(".")[0];
    const s = friend.toString().substring(8).split(".")[1];
    const n = friend.toString().substring(8).split(".")[2].split("/")[0];
    browserHistory.push('/viade_en2a/#/friendRoutes/'+ f +'/'+s + '/'+n);
    await reload();
  }  

  return (
    <div data-testid="manageFriends-container">
      {
        searchResults.map(friend => (
        <Row className="friend">
          <Col>
            <Button variant="light" className="buttonFriend" onClick={(event) => viewRoutes(event,friend)} data-testid={"buttonFriend"+friend}  key={"buttonFriend"+friend}>
              {friend}
            </Button>
          </Col>
          <Col>
            <DropdownButton variant="light" key={friend+"dropdown"} title=""> 
              <Dropdown.Item as="button" href={friend} key={friend+"dropdownI1"}>{t('manageFriends.viewProfile')}</Dropdown.Item>
              <Dropdown.Item as="button"  onClick={(event) => deleteFriend(event,friend)} key={friend+"dropdownI2"}>{t('manageFriends.delete')}</Dropdown.Item>
              <Dropdown.Item as="button"  onClick={(event) => viewRoutes(event,friend)} key={friend+"dropdownI3"}>{t('manageFriends.viewRoutes')}</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        ))
      }
    </div>
  );
};