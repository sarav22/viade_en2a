import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SharedRoutes from "./SharedRoutes";
import FriendBar from "./FriendBar";
import Container from 'react-bootstrap/Container';
import {FriendBarWrapper} from "./FriendBar/friendBar.style";
import {loadAllRoutes} from "/services/DomainJSONTranslator";


export class FriendRoutesComponent extends Component<Props> {

  constructor(props){
    super(props);
		this.state = {
      friendWebId: "",
      routes: []
    };
  }

  loadData() {
    const f = this.props.match.params.f;
    const s = this.props.match.params.s;
    const n = this.props.match.params.n;
    var friendWebId = "https://"+f+"."+s+"."+n+"/profile/card#me";
    this.state.friendWebId = friendWebId;
    this.getRoutes(friendWebId);
  }

  async getRoutes(friendWebId){
    var routes = await loadAllRoutes(friendWebId);
    routes = routes.map(route => route.replace("https://", ""));
    this.setState({ routes: routes });
  }

  render() {
    this.loadData();
    const webId = this.props.webId;
    const friendWebId = this.state.friendWebId;
    const routes = this.state.routes;

    if(routes.length == 0){
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
            <SharedRoutes {...{routes}} />
          </Row>
        </Container>
      );
    }
  }
}