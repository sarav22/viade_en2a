import React, { Component } from 'react';
import { ManageFriendsContent } from './manageFriends.component';
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
      searchResults:null
    }
    this.handleChange = this.handleChange.bind(this);
	}
 
   componentDidMount() {
     this.loadFriends();
   }
   

    async loadFriends() {
      const profileDoc =  await fetchDocument(this.props.webId);
      const profile = profileDoc.getSubject(this.props.webId);
      const fs=profile.getAllRefs(foaf.knows);
      this.setState({friends: fs});
   }

    async searchFriends(matchingString) {
      const filtered = this.state.friends.filter(f=>f.toLowerCase().includes(matchingString.toLowerCase()));
      this.setState({searchResults: filtered});
    }

    handleChange(e) {
      stringToSearch = e.target.value;
      if (stringToSearch !== "") {
        searchFriends(stringToSearch);
        }
      }
    }


   render() {
    if (this.state.friends==null) {
      return <div/>
    }else{
     const friends=this.state.friends;
     const webId=this.props.webId;
     const searchResults = this.state.searchResults;
     return (
       <div>
        <ManageFriendsContent {...{ webId, friends}} />
        <input type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
        <ManageFriendsContent {...{ webId, searchResults}} />
      </div>
     );
    }
   }
}