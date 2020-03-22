import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FriendBar from "./FriendBar";
import Container from 'react-bootstrap/Container';
import {FriendBarWrapper} from "./FriendBar/friendBar.style";
import {loadAllRoutes} from "/services/DomainJSONTranslator";
import { InfiniteList } from "@components";
import {ListItem} from "/containers/RouteList/routeList.container";
import { Base64 } from "js-base64";


export class FriendRoutesComponent extends Component<Props> {

  constructor(props){
    super(props);
		this.state = {
      friendWebId: "",
      routes: [],
      isInfiniteLoading: false,
      elements: []
    };
  }

  loadData() {
    var friendWebId = "https://" + Base64.decode(this.props.match.params.friend);
    this.state.friendWebId = friendWebId;
    this.getRoutes(friendWebId);
  }

  async getRoutes(friendWebId){
    var routes = await loadAllRoutes(friendWebId);
    routes = routes.map(route => route.replace("https://", ""));
    this.setState({ routes: routes });
  }

  buildElements(start, end) {
    var elements = [];
    for (var i = start; i < end; i++) {
      if(this.state.routes[i] !== undefined){
        elements.push(
          <ListItem
            key={i}
            num={i}
            src={
              "https://www.turismoasturias.es/documents/11022/90227/CARES.jpg/0520436c-748a-42ab-9e99-7703dd111d2c?t=1540901739869"
            }
            url={this.state.routes[i]}
          />
        );
      }
      else{
        break;
      }
    }
    return elements;
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

    if(this.state.routes.length == 0){
      return (
        <Container fluid>
          <Row>
            <FriendBarWrapper data-testid="friendBar-wrapper">
              <FriendBar {...{webId, friendWebId}} />
            </FriendBarWrapper>
          </Row>
          <Row>
            <div></div>
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
            <InfiniteList
              {...{
                elements: this.state.elements,
                isInfiniteLoading: this.isInfiniteLoading,
                handleInfiniteLoad: this.handleInfiniteLoad,
                elementInfiniteLoad: this.state.elementInfiniteLoad
              }}
            />
          </Row>
        </Container>
      );
    }
  }
}