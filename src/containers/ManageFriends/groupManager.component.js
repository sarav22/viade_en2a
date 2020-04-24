import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { ManageFriendsWrapper } from "./manageFriends.style";
import { Dropdown } from "@util-components";
import {
  parseGroup,
  checkWebId,
  addWebIdToGroup,
  removeFromGroup,
} from "@services/groupManager";

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
    this.updateGroupState(selected);
  };

  updateGroupState = (group) => {
    this.setState({
      currentGroup: group,
    });
    this.getCurrentURLS(group);
  };

  getCurrentURLS = (selected) => {
    parseGroup(selected).then(
      function(result) {
        this.setState({ currentURLS: result });
      }.bind(this)
    );
  };

  addToGroup(e) {
    e.preventDefault();
    const webIDinput = document.getElementById("webIdGroupAdd").value;
    if (webIDinput !== "") {
      checkWebId(webIDinput).then(
        function(result) {
          if (result) {
            addWebIdToGroup(webIDinput, this.state.currentGroup);
            this.setState({
              currentURLS: this.state.currentURLS.concat(webIDinput),
            });
          }
        }.bind(this)
      );
    }
  }

  deleteFromGroup(event, url) {
    event.preventDefault();
    removeFromGroup(url, this.state.currentGroup).then(
      function() {
        this.updateGroupState(this.state.currentGroup);
      }.bind(this)
    );
  }

  render() {
    if (this.state.groups) {
      const profileOpts = this.state.groups.map((g) => ({
        label: g,
        onClick: this.handleClick,
      }));
      const rows = this.state.currentURLS;
      if (rows && rows.length > 0) {
        return (
          <ManageFriendsWrapper>
            <Dropdown actions={profileOpts} hover>
              Seleccionar Grupo
            </Dropdown>
            <div id="groupManager">
              {rows.map((url) => (
                <Row id="group">
                  {url}
                  <Button
                    variant="light"
                    onClick={(event) => this.deleteFromGroup(event, url)}
                    width="20"
                  >
                    Eliminar
                  </Button>
                </Row>
              ))}
              ;
              <form>
                <p>
                  Enter the webID of the person you want to add to the group:{" "}
                </p>
                <input
                  id="webIdGroupAdd"
                  type="text"
                  placeholder="WebId example: https://mariaflorez.solid.community/profile/card#me"
                />
                <input
                  id="addToGroupButton"
                  class="addToGroupButton"
                  type="submit"
                  value="Add to group"
                  onClick={(event) => this.addToGroup(event)}
                />
              </form>
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
