import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FriendBar from "./FriendBar";
import Container from 'react-bootstrap/Container';
import {FriendBarWrapper} from "./FriendBar/friendBar.style";
import {loadAllRoutes} from "/services/DomainJSONTranslator";
import { InfiniteList } from "@components";
import {ListItem} from "/containers/RouteList/routeList.container";


export class FriendRoutesComponent extends Component<Props> {

  constructor(props){
    super(props);
		this.state = {
      friendWebId: "",
      routes: [],
      isInfiniteLoading: false,
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
    routes.map(route => 
      <ListItem
        src={
          "https://www.turismoasturias.es/documents/11022/90227/CARES.jpg/0520436c-748a-42ab-9e99-7703dd111d2c?t=1540901739869"
        }
        url={route}
      />
    );
    this.setState({ routes: routes });
  }

  handleInfiniteLoad = () => {
    var that = this;
    this.setState({
      isInfiniteLoading: true
    });
    setTimeout(function() {
      var elemLength = that.state.elements.length,
        newElements = that.buildElements(elemLength, elemLength + 10);
      that.setState({
        isInfiniteLoading: false,
        elements: that.state.elements.concat(newElements)
      });
    }, 100);
  };

  elementInfiniteLoad = () => {
    return <div className="infinite-list-item">Loading...</div>;
  }

  render() {
    this.loadData();
    const webId = this.props.webId;
    const friendWebId = this.state.friendWebId;
    const elements = this.state.routes;

    if(elements.length == 0){
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

          </Row>
        </Container>
      );
    }
  }
}