import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {deleteFriend, viewRoutes , getImgByWebId, getName} from '../../services/friendsManager';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

export const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;
export const ImageContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-size: cover;
  overflow: hidden;
  display: inline-table;
`;

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const ManageFriendsContent = props => {
  const { webId, friends, images} = props;
  const { t } = useTranslation();


  return (
    <div fluid data-testid="manageFriends-container">
      {
        friends.map(friend => (
        <Row className="friend" data-testid={friend+"d"}>
          <Col xs={10} md={10} sm={10} xs={10}>
            <Button variant="light" className="buttonFriend" onClick={(event) => viewRoutes(event,friend)} data-testid={"buttonFriend"+friend}  key={"buttonFriend"+friend} id={"buttonFriend"+friend}>
            <ImageContainer data-testid={"imageContainer"+friend}  key={"imageContainer"+friend}>
              <Img src={getImgByWebId(friend, images)} alt="profile"  data-testid={"img"+friend}  key={"img"+friend}/>
            </ImageContainer>{getName(friend)} 
            </Button>
          </Col>
          <Col>
            <DropdownButton variant="light" key={friend+"dropdown"} id={friend+"dropdown"} title=""> 
              <Dropdown.Item as="button" href={friend} key={friend+"dropdownI1"}>{t('manageFriends.viewProfile')}</Dropdown.Item>
              <Dropdown.Item as="button"  onClick={(event) => deleteFriend(event,friend)} key={friend+"dropdownI2"} id={friend+"dropdownDelete"}>{t('manageFriends.delete')}</Dropdown.Item>
              <Dropdown.Item as="button"  onClick={(event) => viewRoutes(event,friend)} key={friend+"dropdownI3"}>{t('manageFriends.viewRoutes')}</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        ))
      }
      </div>
  );
};
