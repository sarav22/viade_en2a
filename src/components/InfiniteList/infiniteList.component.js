import React, { Component } from "react";
import { ListWrapper } from "./infiniteList.style";
import Infinite from "react-infinite";

class ListItem extends Component {
  render() {
    return <div className="infinite-list-item">List Item {this.props.num}</div>;
  }
}

export class InfiniteList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      elements: this.buildElements(0, 500),
      isInfiniteLoading: false
    };
  }

  buildElements(start, end) {
    var elements = [];
    for (var i = start; i < end; i++) {
      elements.push(<ListItem key={i} num={i} />);
    }
    return elements;
  }

  handleInfiniteLoad() {
    var that = this;
    this.setState({
      isInfiniteLoading: true
    });
    setTimeout(function() {
      var elemLength = that.state.elements.length,
        newElements = that.buildElements(elemLength, elemLength + 1000);
      that.setState({
        isInfiniteLoading: false,
        elements: that.state.elements.concat(newElements)
      });
    }, 2500);
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item">Loading...</div>;
  }
  render() {
    return (
      <ListWrapper>
        <Infinite
          elementHeight={20}
          useWindowAsScrollContainer={true}
          infiniteLoadBeginEdgeOffset={200}
          onInfiniteLoad={this.handleInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
        >
          {this.state.elements}
        </Infinite>
      </ListWrapper>
    );
  }
}
