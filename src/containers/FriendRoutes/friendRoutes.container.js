import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import FriendBar from "./FriendBar";
import Container from "react-bootstrap/Container";
import { FriendBarWrapper } from "./FriendBar/friendBar.style";
import { loadFriendRoutes } from "/services/DomainJSONTranslator";
import { InfiniteList } from "@components";
import { ListItem } from "/containers/RouteList/routeList.container";
import { Base64 } from "js-base64";
import { FriendRoutesWrapper } from "./friendRoutes.style";

export class FriendRoutesComponent extends Component<Props> {
  constructor(props) {
    super(props);
    var friendWebId =
      "https://" + Base64.decode(this.props.match.params.friend);
    this.state = {
      friendWebId: friendWebId,
      routes: [],
      isInfiniteLoading: false,
      elements: [],
    };
  }

  loadData() {
    this.getRoutes(this.state.friendWebId);
  }

  async getRoutes(friendWebId) {
    const filename = await friendWebId.substring(8, friendWebId.length - 16);
    var routes = await loadFriendRoutes(this.props.webId, filename);
    await this.setState({ routes: routes });
    routes = this.state.routes.map((route) => route.replace("https://", ""));
    this.setState({ routes: routes });
  }

  buildElements(start, end) {
    var elements = [];
    for (var i = start; i < end; i++) {
      if (this.state.routes[i] !== undefined) {
        elements.push(<ListItem key={i} num={i} url={this.state.routes[i]} />);
      } else {
        break;
      }
    }
    return elements;
  }

  handleInfiniteLoad = () => {
    var that = this;
    this.setState({
      isInfiniteLoading: true,
    });
    setTimeout(function() {
      var elemLength = that.state.elements.length,
        newElements = that.buildElements(elemLength, elemLength + 10);
      that.setState({
        isInfiniteLoading: false,
        elements: that.state.elements.concat(newElements),
      });
    }, 100);
  };

  elementInfiniteLoad = () => {
    return <div className="infinite-list-item">Loading...</div>;
  };

  render() {
    this.loadData();
    const webId = this.props.webId;
    const friendWebId = this.state.friendWebId;

    if (this.state.routes.length === 0) {
      return (
        <FriendRoutesWrapper>
          <Container fluid>
            <Row>
              <FriendBarWrapper data-testid="friendBar-wrapper">
                <FriendBar {...{ webId, friendWebId }} />
              </FriendBarWrapper>
            </Row>
            <Row>
              <div></div>
            </Row>
          </Container>
        </FriendRoutesWrapper>
      );
    } else {
      return (
        <FriendRoutesWrapper>
          <Container fluid>
            <Row>
              <FriendBarWrapper data-testid="friendBar-wrapper">
                <FriendBar {...{ webId, friendWebId }} />
              </FriendBarWrapper>
            </Row>
            <Row>
              <InfiniteList
                {...{
                  elements: this.state.elements,
                  isInfiniteLoading: this.isInfiniteLoading,
                  handleInfiniteLoad: this.handleInfiniteLoad,
                  elementInfiniteLoad: this.state.elementInfiniteLoad,
                }}
              />
            </Row>
          </Container>
        </FriendRoutesWrapper>
      );
    }
  }
}
