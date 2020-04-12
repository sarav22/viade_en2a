import React, { Component } from 'react';
import { ManageFriendsContent } from './manageFriends.component';
import { SearchFriendsContent } from './searchFriends.component';
import  AddFriendsContent  from './addFriend.component';
import {foaf} from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import { ManageFriendsWrapper, ButtonFriend } from "./manageFriends.style";
import Row from 'react-bootstrap/Row';


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
      const webId=this.props.webId;
      if (this.state.searchResults==null){
        return (
          <ManageFriendsWrapper data-testid="manageFriends-wrapper">
          <Row>
            <input type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
          </Row>
          <Row>
            <ManageFriendsContent {...{ webId, friends}} />
          </Row>
          <Row>
            <AddFriendsContent webId={webId}/>
          </Row>
          </ManageFriendsWrapper>
        );
      }
      const searchResults = this.state.searchResults;
      return (
        <ManageFriendsWrapper data-testid="manageFriends-wrapper">
        <Row>
          <input type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
        </Row>
        <Row>
          <SearchFriendsContent {...{ webId, searchResults}} />
        </Row>
        <Row>
            <AddFriendsContent webId={webId}/>
        </Row>
        </ManageFriendsWrapper>
      );
    }
   }
}