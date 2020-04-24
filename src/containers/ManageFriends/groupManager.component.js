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
  renameGroupTo,
  createNewGroup,
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

  handleClick = (value) => {
    this.updateGroupState(value);
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

  rename(e) {
    e.preventDefault();
    const nameInput = document.getElementById("groupName").value;
    if (nameInput !== "") {
      if (this.state.currentGroup === "new") {
        createNewGroup(this.state.webId, nameInput).then(
          function(givenUrl) {
            this.setState({
              currentGroup: givenUrl,
              groups: this.state.groups.concat({
                name: nameInput,
                url: givenUrl,
              }),
            });
          }.bind(this)
        );
        return;
      }
      renameGroupTo(this.state.currentGroup, nameInput);
    }
  }

  newGroup(e) {
    e.preventDefault();
    this.setState({ currentGroup: "new", currentURLS: [] });
  }

  render() {
    if (this.state.groups) {
      const profileOpts = this.state.groups.map((g) => ({
        label: g.name,
        onClick: function() {
          this.handleClick(g.url);
        }.bind(this),
      }));
      let currentName = this.state.groups.find(
        (g) => g.url === this.state.currentGroup
      );
      if (this.state.currentGroup === "new") {
        currentName = { name: "Write a new Name" };
      }
      profileOpts.push({
        label: "newGroup",
        onClick: function(event) {
          this.newGroup(event);
        }.bind(this),
      });
      const rows = this.state.currentURLS;
      if (this.state.currentGroup) {
        return (
          <ManageFriendsWrapper>
            <Dropdown actions={profileOpts} hover>
              Seleccionar Grupo
            </Dropdown>
            <form>
              <p>Group Name: </p>
              <input
                id="groupName"
                type="text"
                placeholder={currentName.name}
              />
              <input
                id="updateGroupName"
                type="submit"
                value="Update Name"
                onClick={(event) => this.rename(event)}
              />
            </form>
            <div id="groupManager">
              {rows &&
                rows.length > 0 &&
                rows.map((url) => (
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
    const profileOpts = [];
    profileOpts.push({
      label: "newGroup",
      onClick: function(event) {
        this.newGroup(event);
      }.bind(this),
    });
    return (
      <ManageFriendsWrapper>
        <Dropdown actions={profileOpts} hover>
          Seleccionar Grupo
        </Dropdown>{" "}
        <div id="groupManager">No groups found</div>{" "}
      </ManageFriendsWrapper>
    );
  }
}

export default GroupManager;
