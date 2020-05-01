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
  deleteGroupWithURL,
} from "@services/groupManager";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';

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
  deleteGroup(event) {
    event.preventDefault();
    deleteGroupWithURL(this.state.currentGroup).then(
      function() {
        this.setState({
          groups: this.state.groups.filter(
            (g) => g.url !== this.state.currentGroup
          ),
          currentGroup: null,
        });
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
      if (this.state.currentGroup != null) {
        return (
          <ManageFriendsWrapper>
            <Form>
              <Form.Label className="label">GROUP MANAGER</Form.Label>
            </Form>
            <Dropdown actions={profileOpts} hover style={{width:"50%"}}>
              Seleccionar Grupo
            </Dropdown>
            <Form>
              <Form.Group>
                <Form.Label className="label" style={{"font-size":"16px", "marginBottom":"10px", "marginTop":"15px"}}>
                  Group Name: 
                </Form.Label>
                <Form.Control id="groupName" className="inputAdd" type="text" placeholder={currentName.name} />
              </Form.Group>
              <Button id="updateName" className="addFriendButton" variant="light" onClick={(event) => this.rename(event)}
                data-testid="updateName">
                Update Name
              </Button>
            </Form>
            <Button id="deleteGroup" className="addFriendButton" variant="light" onClick={(event) => this.deleteGroup(event)}
                data-testid="addToGroupButton">
                Delete group
            </Button>
            <div id="groupManager">
              <Form.Label className="label" style={{"font-size":"16px"}}>
                GROUP MEMBERS:
              </Form.Label>
              {rows &&
                rows.length > 0 &&
                rows.map((url) => (
                  <Row id="group">
                    <Card style={{ width:'60%', margin:'10px 10px 10px 15px', 'padding':'5px'}} text="dark" data-testid={"member"+url}>
                      {url.replace("https://", "").replace("/profile/card#me", "")}
                    </Card>
                    <Button align="right"
                      style={{ 'margin':'10px 0px 10px 0px'}}
                      variant="light"
                      onClick={(event) => this.deleteFromGroup(event, url)}
                      width="100%"
                      className="buttonDelete"
                    >
                      Eliminar
                    </Button>
                  </Row>
                ))}
              ;
            </div>
            <Form>
              <Form.Group>
                <Form.Label className="label" style={{"font-size":"16px", "marginBottom":"10px"}}>
                  Enter the webID of the person you want to add to the group:{" "}
                </Form.Label>
                <Form.Control id="webIdGroupAdd" className="inputAdd" type="text" placeholder="WebId example: https://mariaflorez.solid.community/profile/card#me" />
              </Form.Group>
              <Button id="addToGroupButton" className="addFriendButton" variant="light" onClick={(event) => this.addToGroup(event)}
                data-testid="addToGroupButton">
                Add to group
              </Button>
            </Form>
          </ManageFriendsWrapper>
        );
      } else {
        return (
          <ManageFriendsWrapper>
            <Form>
              <Form.Label className="label">GROUP MANAGER</Form.Label>
            </Form>
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
