import React, {Component} from 'react';
import ldflex from '@solid/query-ldflex';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { withTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';
import {
  ManageFriendsWrapper
} from './manageFriends.style';
import { relativeTimeRounding } from 'moment';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    const { t } = this.props;
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
        alert(t('manageFriends.error.nonexistentWebID')); //WebID does not exist
      } else {
        alert(t('manageFriends.error.defaultErrorMessage'));
      }
    } else {
      alert(t('manageFriends.error.notValidWebID')); //The inputted webID doesn't have a valid format
    }
    await this.reload();
  }


  render(){
    const { t } = this.props;
    return (
      <Form data-testid="addFriendForm">
        <Form.Group>
          <Form.Label className="label">{t('manageFriends.addFriendExplanation')}</Form.Label>
          <Form.Control className="inputAdd" id="webId" type="text" placeholder={t('manageFriends.webIDExample')}/>
        </Form.Group>
          <Button id="addFriendButton" className="addFriendButton" variant="light" onClick={(event) => this.addFriend(event)} 
            style={{'paddingLeft': '1px'}} data-testid="addFriendButton" >
            {t('manageFriends.addFriend')}
          </Button>
      </Form>
    )
  }

  
}

export default withTranslation()(AddFriendsContent);