import React, { Component } from 'react';
import { ManageFriendsContent } from './manageFriends.component';
import { SearchFriendsContent } from './searchFriends.component';
import  AddFriendsContent  from './addFriend.component';
import {foaf} from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import { ManageFriendsWrapper, ButtonFriend } from "./manageFriends.style";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';


/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class ManageFriendsComponent extends Component<Props> {
	
	constructor(props){
    super(props);
		this.state={
      friends:null,
      searchResults:null,
    }
    this.handleChange = this.handleChange.bind(this);
	}
 
   componentDidMount() {
     this.loadFriends();
     this.searchFriends("");
   }
   

    async loadFriends() {
      const profileDoc =  await fetchDocument(this.props.webId);
      const profile = profileDoc.getSubject(this.props.webId);
      const fs=profile.getAllRefs(foaf.knows);
      this.setState({friends: fs});
   }

    searchFriends(matchingString) {
      if (matchingString!==""){
        const filtered = this.state.friends.filter(f=>f.toLowerCase().includes(matchingString.toLowerCase()));
        this.setState({searchResults: filtered});
      }
    }

    handleChange(e) {
      const stringToSearch = e.target.value;
      if (stringToSearch !== "") {
        this.searchFriends(stringToSearch);
      }
    }


   render() {
    if (this.state.friends==null) {
      return <div/>
    } else{
      const friends=this.state.friends;
      const friendNames=this.state.friendNames;
      const webId=this.props.webId;
      if (this.state.searchResults==null){
        return (
          <ManageFriendsWrapper data-testid="manageFriends-wrapper">
          <Container fluid>
            <Row>
              <Col xs={9} md={6} sm={6} xs={12}>
                <Form>
                  <Form.Group>
                    <Form.Label className="label">List of Friends</Form.Label>
                    <Form.Control type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
                  </Form.Group>
                </Form>
                <ManageFriendsContent {...{ webId, friends}} />
              </Col>
              <Col xs={9} md={6} sm={6} xs={12} align="right">
                <AddFriendsContent webId={webId}/>
              </Col>
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
                  <Form.Control type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
                </Form.Group>
              </Form>
              <SearchFriendsContent {...{ webId, searchResults}} />
            </Col>
            <Col xs={9} md={6} sm={6} xs={12} align="right">
              <AddFriendsContent webId={webId}/>
            </Col>
          </Row>
        </Container>
        </ManageFriendsWrapper>
      );
    }
   }
}