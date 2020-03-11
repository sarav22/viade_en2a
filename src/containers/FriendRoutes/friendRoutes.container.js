import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SharedRoutes from "./SharedRoutes";
import FriendBar from "./FriendBar";
import Container from 'react-bootstrap/Container';
import {FriendBarWrapper} from "./FriendBar/friendBar.style";
import { fetchDocument } from 'tripledoc';
import { foaf } from 'rdf-namespaces';


export class FriendRoutesComponent extends Component<Props> {

  constructor(props){
    super(props);
		this.state={
			routes:null
		}
  }

  componentDidMount() {
    this.getSharedRoutes();
  }

  async getSharedRoutes() {
    const webIdDoc = await fetchDocument(this.props.friendWebId);
    const profile = webIdDoc.getSubject(this.props.friendWebId);
    const froutes = profile.getAllRefs(/*Write here the namespace for the routes*/);
    this.setState({routes:froutes});
  }


  render() {
    const webId = this.props.webId;
    const friendWebId = this.props.friendWebId;
    const routes = this.state.routes;

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
            <Col>
              <SharedRoutes {...{routes}} />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}