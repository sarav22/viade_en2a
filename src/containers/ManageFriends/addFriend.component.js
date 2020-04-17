import React, {Component} from 'react';
import ldflex from '@solid/query-ldflex';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';
import {
  ManageFriendsWrapper
} from './manageFriends.style';
import { relativeTimeRounding } from 'moment';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

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


  componentDidMount(){

  }

  async ldflexAdder(friend){
    console.log(this.props.webId)
    return ldflex[this.props.webId].knows.add(ldflex[friend]);
  }
  
  reload(){
    window.location.reload(true);
  }

  async addFriend(event) {
    event.preventDefault();
    let userId = document.getElementById("webId").value;
    var friendToAdd = userId;
    if (friendToAdd.search("/profile/card#me") !== -1){
      fetch(friendToAdd).then( response => {
        this.setState({status: response.status, done: true});
      });
      if (this.state.status === 200) {
        this.ldflexAdder(friendToAdd);
      } else if (this.state.status === 404) {
        //El webId no existe
        alert("This webId does not exist"); //Esto de poner alerts me parece un poco sucio, debería ser en un div o algo así en el propio código html
      } else {
        alert("An error occurred while trying to fetch this webId"); //Y lo mismo aquí
      }
    } else {
      alert("This is not a valid webId"); //Y lo mismo aquí
    }
    await this.reload();
  }


  render(){
    return (
      <ManageFriendsWrapper data-testid="manageFriends-wrapper">
        <h5>Enter the webID of the person you want to add as friend: </h5>
        <input id="webId" type="text" placeholder="WebId example: https://mariaflorez.solid.community/profile/card#me"/>
        <Button id="addFriendButton" className="addFriendButton" variant="light" onClick={(event) => this.addFriend(event)} 
          style={{'paddingLeft': '1px'}} data-testid="addFriendButton" >
          Add friend
        </Button>
      </ManageFriendsWrapper>
    )
  }

  
}

export default AddFriendsContent;