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
			friends:null
		}
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

   render() {
    if (this.state.friends==null) {
      return <div/>
    }else{
     const friends=this.state.friends;
     const webId=this.props.webId;
     return (
      <ManageFriendsContent {...{ webId, friends}} />
     );
    }
   }
}