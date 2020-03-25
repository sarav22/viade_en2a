import React, { Component } from 'react';
import { ManageFriendsContent } from './manageFriends.component';
import { SearchFriendsContent } from './searchFriends.component';
import {searchFriends } from '../../services/friendsManager';
import {foaf} from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';



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
     this.loadFriends(this.props.webId);
     searchFriends("");
   }

   async  loadFriends(webId) {
    const profileDoc =  await fetchDocument(webId);
    const profile = profileDoc.getSubject(webId);
    const fs=profile.getAllRefs(foaf.knows);
    this.setState({friends: fs});
   } 
   
    handleChange(e) {
      const stringToSearch = e.target.value;
      if (stringToSearch !== "") {
        searchFriends(stringToSearch);
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
          <div>
            <ManageFriendsContent {...{ webId, friends}} />
            <input type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
          </div>
        );
      }
      const searchResults = this.state.searchResults;
      return (
        <div>
          <ManageFriendsContent {...{ webId, friends}} />
          <input type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
          <SearchFriendsContent {...{ webId, searchResults}} />
        </div>
      );
    }
   }
}