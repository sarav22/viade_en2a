import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SharedRoutes from "./SharedRoutes";
import FriendBar from "./FriendBar";
import Container from 'react-bootstrap/Container';
import {FriendBarWrapper} from "./FriendBar/friendBar.style";


export class FriendRoutesComponent extends Component<Props> {

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }


  render() {
    const webId = this.props.webId;
    const friendWebId = "https://agm.solid.community/profile/card#me"/*this.props.friendWebId*/;
    
    return (
      <Container fluid>
        <Row>
          <FriendBarWrapper>
            <FriendBar {...{webId, friendWebId}} />
          </FriendBarWrapper>
        </Row>
        <Row>
          <Col>
            <SharedRoutes {...{ webId, friendWebId}}/>
          </Col>
          <Col>
            <SharedRoutes {...{ friendWebId, webId}} />
          </Col>
        </Row>
      </Container>
    );
  }
}