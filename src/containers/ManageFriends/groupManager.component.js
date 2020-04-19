import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { ManageFriendsWrapper } from "./manageFriends.style";
import { Dropdown } from "@util-components";
import { parseGroup } from "@services/groupManager";

type Props = {
  webId: String,
  groups: [],
};

class GroupManager extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      webId: props.webId,
      groups: props.groups,
      currentGroup: null,
      currentURLS: [],
    };
  }

  handleClick = (e) => {
    let selected = e.target.innerHTML;
    selected = selected.replace(/<\/?[^>]+(>|$)/g, "");
    this.setState({
      currentGroup: selected,
    });
    this.getCurrentURLS(selected);
  };

  getCurrentURLS = (selected) => {
    parseGroup(selected).then((result) =>
      this.setState({ currentURLS: result })
    );
  };

  render() {
    if (this.state.groups) {
      const profileOpts = this.state.groups.map((g) => ({
        label: g,
        onClick: this.handleClick,
      }));
      const rows = this.state.currentURLS;
      if (rows) {
        return (
          <ManageFriendsWrapper>
            <Dropdown actions={profileOpts} hover>
              Seleccionar Grupo
            </Dropdown>
            <div id="groupManager">
              {rows.map((url) => (
                <Row id="group">{url}</Row>
              ))}
              ;
            </div>
          </ManageFriendsWrapper>
        );
      } else {
        return (
          <ManageFriendsWrapper>
            <Dropdown actions={profileOpts} hover>
              Seleccionar Grupo
            </Dropdown>
          </ManageFriendsWrapper>
        );
      }
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
