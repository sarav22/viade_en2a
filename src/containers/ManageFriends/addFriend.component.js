import React, {Component} from 'react';
import ldflex from '@solid/query-ldflex';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';
import {
  ManageFriendsWrapper,
} from './manageFriends.style';
import { relativeTimeRounding } from 'moment';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */

class AddFriendsContent extends Component<Props> {
  constructor(props){
    super(props);

    this.state = {status: 200, done: false}
  }

  /*async loadFriends() {
    const profileDoc =  await fetchDocument(this.props.webId);
    const profile = profileDoc.getSubject(this.props.webId);
    const fs=profile.getAllRefs(foaf.knows);
    this.setState({friends: fs});
 }*/

  componentDidMount(){

  }

  async ldflexDeleter(friend){
    console.log(this.props.webId)
    return ldflex[this.props.webId].knows.add(ldflex[friend]);
  }
  
  reload(){
    window.location.reload(true);
  }

  async addFriend(event) {
    event.preventDefault();
    let userId = document.getElementById("webId").value;
     //alert(userId);
     // Creates an object which can read files from the server
    var friendToAdd = userId;
    //alert(friendToAdd);
    fetch('https://' + friendToAdd + '.solid.community').then( response => {
      this.setState({status: response.status, done: true});
      //alert(this.state.status);
      
      
    });
    await this.ldflexDeleter('https://' + friendToAdd + ".solid.community/profile/card#me");
    await this.reload();

    //Mirar cómo lanzar la petición
    /*var request = new XMLHttpRequest();  
    request.open('GET', 'https://' + friendToAdd + '.solid.community', true);
    request.onreadystatechange = function(){
        alert("yipee");
        if (request.readyState === 4){
            if (request.status === 404) {  
                alert("Oh no, it does not exist!");
            }  
        }
        request.send();*/
    
    //await reload();
  }


  render(){
    return (
      <ManageFriendsWrapper data-testid="manageFriends-wrapper">
        {
          <form>
              <p>Enter the webID of the person you want to add as friend: </p>
              <input id="webId" type="text"/>
              <input type="submit" value="Add friend" onClick={(event) => this.addFriend(event)}/>
          </form>
        }
      </ManageFriendsWrapper>
    )
  }

  
}

export default AddFriendsContent;

/*export const AddFriendsContent = props => {
    const { webId } = props;
    const { t } = useTranslation();

  
  const reload = () => {
    window.location.reload(true);
  }


 
 /*async function addFriend(event) {
    event.preventDefault();
    let userId = document.getElementById("webId").value;
     //alert(userId);
     // Creates an object which can read files from the server
    var friendToAdd = userId;
    alert(friendToAdd);
    //Mirar cómo lanzar la petición
    var request = new XMLHttpRequest();  
    request.open('GET', 'https://' + friendToAdd + '.solid.community', true);
    request.onreadystatechange = function(){
        alert("yipee");
        if (request.readyState === 4){
            if (request.status === 404) {  
                alert("Oh no, it does not exist!");
            }  
        }
        request.send();
    /*await ldflexDeleter(friend);
    await reload();*/
   // }
 //}
//}


  
//}