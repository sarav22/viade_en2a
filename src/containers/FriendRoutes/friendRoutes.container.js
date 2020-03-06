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
    const webId  = "98765"/*this.props.webId*/;
    const friendWebId = "123456"/*this.props.friendWebId*/;
    
    return (
      <Container fluid>
        <Row>
          <FriendBarWrapper>
            <FriendBar friend={{friendWebId}}></FriendBar>
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