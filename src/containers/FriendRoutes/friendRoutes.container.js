import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SharedRoutes from "./SharedRoutes";
import FriendBar from "./FriendBar";
import Container from 'react-bootstrap/Container';
import {FriendBarWrapper} from "./FriendBar/friendBar.style";


export class FriendRoutesComponent extends Component<Props> {

  constructor(props){
    super(props);
		this.state={
			routes:null
		}
  }

  componentDidMount() {
    
  }

  async getSharedRoutes(friendWebId) {
    const auth = require('solid-auth-cli')
    const sharedFolder = "/public/viade/sharedRoutes/";
    const friendPod = friendWebId.split("/")[0] + "//" + friendWebId.split("/")[1]
    const FC = require('solid-file-client');
    const fc = new FC( auth );
    let froutes = await fc.readFolder( friendPod + sharedFolder ).links;
    this.setState({routes:froutes});
    return null; //For this version we will not implement this feature
  }


  render() {
    const webId = this.props.webId;
    const f = this.props.match.params.f;
    const s = this.props.match.params.s;
    const n = this.props.match.params.n;
    const friendWebId = "https://"+f+"."+s+"."+n+"/profile/card#me";
    const routes = this.getSharedRoutes(friendWebId);

    if(routes == null){
      return (
        <Container fluid>
          <Row>
            <FriendBarWrapper data-testid="friendBar-wrapper">
              <FriendBar {...{webId, friendWebId}} />
            </FriendBarWrapper>
          </Row>
          <Row>
            <Col>
              <div></div>
            </Col>
          </Row>
        </Container>
      );
    }
    else{
      return (
        <Container fluid>
          <Row>
            <FriendBarWrapper data-testid="friendBar-wrapper">
              <FriendBar {...{webId, friendWebId}} />
            </FriendBarWrapper>
          </Row>
          <Row>
            <Col>
              <SharedRoutes {...{routes}}/>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}