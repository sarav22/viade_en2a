import React, { Component } from "react";
import ldflex from "@solid/query-ldflex";
import { withTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { errorToaster, successToaster } from "@utils";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */

class AddFriendsContent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = { status: 200, done: false };
  }

  componentDidMount() {}

  async ldflexAdder(friend) {
    return ldflex[this.props.webId].knows.add(ldflex[friend]);
  }

  reload() {
    window.location.reload(true);
  }

  resumeExecutionAfter3Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 3000);
    });
  }

  async addFriend(event) {
    const { t } = this.props;
    event.preventDefault();
    let userId = document.getElementById("webId").value;
    var friendToAdd = userId;
    if (friendToAdd.search("/profile/card#me") !== -1) {
      fetch(friendToAdd)
        .then((response) => {
          this.setState({ status: response.status, done: true });
        })
        .then((response) => {
          if (this.state.status === 200) {
            this.ldflexAdder(friendToAdd);
            successToaster(t("manageFriends.addFriendSucess"));
            var promise = this.resumeExecutionAfter3Seconds();
            promise.then((response) => this.reload());
          } else if (this.state.status === 404) {
            //El webId no existe
            errorToaster(t("manageFriends.error.nonexistentWebID")); //WebID does not exist
          } else {
            errorToaster(t("manageFriends.error.defaultErrorMessage"));
          }
        });
    } else {
      errorToaster(t("manageFriends.error.notValidWebID")); //The inputted webID doesn't have a valid format
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Form data-testid="addFriendForm">
        <Form.Group>
          <Form.Label className="label" data-testid="addFriendLabel">
            {t("manageFriends.addFriendExplanation")}
          </Form.Label>
          <Form.Control
            className="inputAdd"
            id="webId"
            type="text"
            placeholder={t("manageFriends.webIDExample")}
            data-testid="webIdFriend"
          />
        </Form.Group>
        <Button
          id="addFriendButton"
          className="addFriendButton"
          variant="light"
          onClick={(event) => this.addFriend(event)}
          style={{ paddingLeft: "1px" }}
          data-testid="addFriendButton"
        >
          {t("manageFriends.addFriend")}
        </Button>
      </Form>
    );
  }
}

export default withTranslation()(AddFriendsContent);
