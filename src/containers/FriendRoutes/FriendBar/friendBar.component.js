import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import BackButton from "./children/BackButton";
import FriendDropdown from "./children/FriendDropdown";
import { fetchDocument } from "tripledoc";
import { foaf } from "rdf-namespaces";

export class FriendBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      friendName: "",
    };
  }

  async getFriendName(friend) {
    const friendDoc = await fetchDocument(friend);
    const friendProfile = friendDoc.getSubject(friend);
    const friendName = await friendProfile.getString(foaf.name);
    this.setState({ friendName: friendName });
  }

  loadName(friendWebId) {
    this.getFriendName(friendWebId);
  }

  render() {
    const { webId, friendWebId } = this.props;
    this.loadName(friendWebId);
    const friendName = this.state.friendName;

    return (
      <Container fluid data-testid="friendBar-component">
        <Row>
          <Col align="right">
            <BackButton />
          </Col>
          <Col xs={6}>
            <Card
              style={{ height: "65%" }}
              text="primary"
              data-testid="friendBarName"
            >
              {friendName}
            </Card>
          </Col>
          <Col>
            <FriendDropdown {...{ webId, friendWebId }} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FriendBar;
