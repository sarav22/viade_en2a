import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  deleteFriend,
  viewRoutes,
  getImgByWebId,
  getName,
  viewProfile,
} from "../../services/friendsManager";
import styled from "styled-components";

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
export const SearchFriendsContent = (props) => {
  const { webId, searchResults, images } = props;
  const { t } = useTranslation();

  return (
    <div data-testid="searchFriends-component">
      {searchResults.map((friend) => (
        <Row className="friend">
          <Col xs={10} md={10} sm={10}>
            <Button
              variant="light"
              className="buttonFriend"
              onClick={(event) => viewRoutes(event, friend)}
              data-testid={"buttonFriend" + friend}
              key={"buttonFriend" + friend}
              id={"buttonFriend" + friend}
            >
              <ImageContainer
                className="picture"
                data-testid={"imageContainer" + friend}
                key={"imageContainer" + friend}
              >
                <Img
                  style={{ "border-radius": "50%" }}
                  src={getImgByWebId(friend, images)}
                  alt="profile"
                  data-testid={"img" + friend}
                  key={"img" + friend}
                />
              </ImageContainer>
              {getName(friend)}
            </Button>
          </Col>
          <Col md={2} sm={2} xs={2}>
            <DropdownButton
              variant="light"
              key={friend + "dropdown"}
              id={friend + "dropdown"}
              title=""
            >
              <Dropdown.Item
                as="button"
                onClick={(event) => viewProfile(event, friend)}
                key={friend + "dropdownI1"}
              >
                {t("manageFriends.viewProfile")}
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={(event) => deleteFriend(event, friend, webId)}
                key={friend + "dropdownI2"}
                id={friend + "dropdownDelete"}
              >
                {t("manageFriends.delete")}
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={(event) => viewRoutes(event, friend)}
                key={friend + "dropdownI3"}
              >
                {t("manageFriends.viewRoutes")}
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      ))}
    </div>
  );
};
