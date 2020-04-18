import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { ManageFriendsWrapper } from "./manageFriends.style";
import { Dropdown } from "@util-components";

type Props = {
  webId: String,
  groups: [],
};

class GroupManager extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { webId: props.webId, groups: props.groups };
  }

  handleClick = (e) => {
    console.log(e.target);
  };

  render() {
    if (this.state.groups) {
      const profileOpts = this.state.groups.map((g) => ({
        label: g,
        onClick: this.handleClick,
      }));
      return (
        <ManageFriendsWrapper>
          {" "}
          <Dropdown actions={profileOpts} hover>
            Seleccionar Grupo
          </Dropdown>
          <div id="groupManager">
            {this.state.groups.map((g) => (
              <Row id="group">{g}</Row>
            ))}
            ;
          </div>
        </ManageFriendsWrapper>
      );
    }
    return (
      <ManageFriendsWrapper>
        {" "}
        <div id="groupManager">No groups found</div>{" "}
      </ManageFriendsWrapper>
    );
  }
}

export default GroupManager;
