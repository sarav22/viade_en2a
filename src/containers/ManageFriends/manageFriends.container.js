import React, { Component } from "react";
import { ManageFriendsContent } from "./manageFriends.component";
import { SearchFriendsContent } from "./searchFriends.component";
import AddFriendsContent from "./addFriend.component";
import { foaf } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import { ManageFriendsWrapper } from "./manageFriends.style";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import data from "@solid/query-ldflex";
import GroupManager from "./groupManager.component";
import { retrieveGroups } from "@services/PODExtractor";
import { getGroupName } from "@services/groupManager";

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class ManageFriendsComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      friends: null,
      searchResults: null,
      images: [],
      groups: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadFriends();
    this.searchFriends("");
    this.loadGroups().then(
      function(result) {
        this.setState({ groups: result });
      }.bind(this)
    );
  }

  async loadGroups() {
    var filesObj = await retrieveGroups(this.props.webId);
    if (filesObj.files) {
      let result = filesObj.files.map(async (urlMap) => ({
        name: await getGroupName(urlMap.url),
        url: urlMap.url,
      }));
      return Promise.all(result).then(function(rs) {
        return rs;
      });
    }
  }

  async loadFriends() {
    const profileDoc = await fetchDocument(this.props.webId);
    const profile = profileDoc.getSubject(this.props.webId);
    const fs = profile.getAllRefs(foaf.knows);
    this.setState({ friends: fs });
    await this.loadImage(this.state.friends);
  }

  async loadImage(friends) {
    friends.forEach((friendWebId) => {
      const user = data[friendWebId];
      const i = user.vcard_hasPhoto;
      i.then((response) => {
        if (response && response.value) {
          let array = this.state.images;
          array.push({ id: friendWebId, img: response.value });
          this.setState({ images: array });
        } else {
          let array = this.state.images;
          array.push({ id: friendWebId, img: "img/icon/empty-profile.svg" });
          this.setState({ images: array });
        }
      });
    });
  }

  searchFriends(matchingString) {
    if (matchingString !== "") {
      const filtered = this.state.friends.filter((f) =>
        f.toLowerCase().includes(matchingString.toLowerCase())
      );
      this.setState({ searchResults: filtered });
    }
  }

  handleChange(e) {
    const stringToSearch = e.target.value;
    if (stringToSearch !== "") {
      this.searchFriends(stringToSearch);
    }
  }

  render() {
    if (this.state.friends == null || !this.state.groups) {
      return <div />;
    } else {
      const friends = this.state.friends;
      const images = this.state.images;
      const webId = this.props.webId;
      if (this.state.searchResults == null) {
        return (
          <ManageFriendsWrapper data-testid="manageFriends-wrapper">
            <Container fluid>
              <Row>
                <Col xs={9} md={6} sm={6} xs={12}>
                  <Form>
                    <Form.Group>
                      <Form.Label className="label">List of Friends</Form.Label>
                      <Form.Control
                        type="text"
                        className="input"
                        placeholder="Search..."
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form>
                  <ManageFriendsContent {...{ webId, friends, images }} />
                </Col>
                <Col xs={9} md={6} sm={6} xs={12} align="right">
                  <AddFriendsContent webId={webId} />
                </Col>
              </Row>
              <Row>
                <GroupManager webId={webId} groups={this.state.groups} />
              </Row>
            </Container>
          </ManageFriendsWrapper>
        );
      }
      const searchResults = this.state.searchResults;
      return (
        <ManageFriendsWrapper data-testid="manageFriends-wrapper">
          <Container fluid>
            <Row>
              <Col xs={9} md={6} sm={6} xs={12}>
                <Form>
                  <Form.Group>
                    <Form.Label className="label">List of Friends</Form.Label>
                    <Form.Control
                      type="text"
                      className="input"
                      placeholder="Search..."
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
                <SearchFriendsContent {...{ webId, searchResults, images }} />
              </Col>
              <Col xs={9} md={6} sm={6} xs={12} align="right">
                <AddFriendsContent webId={webId} />
              </Col>
            </Row>
            <Row>
              <GroupManager webId={webId} groups={this.state.groups} />
            </Row>
          </Container>
        </ManageFriendsWrapper>
      );
    }
  }
}
