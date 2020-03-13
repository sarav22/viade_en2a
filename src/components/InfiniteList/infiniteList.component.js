import React, { Component } from "react";
import { ListWrapper } from "./infiniteList.style";
import Infinite from "react-infinite";
import Button from "react-bootstrap/Button";
import ldflex from "@solid/query-ldflex";
import { withWebId } from "@inrupt/solid-react-components";

type Props = {
  webId: String,
  elements: [],
  isInfiniteLoading: Boolean,
  buildElements: () => void,
  handleInfiniteLoad: () => void,
  elementInfiniteLoad: () => void
};

export const InfiniteList = (props: Props) => {
  const {
    elements,
    isInfiniteLoading,
    handleInfiniteLoad,
    elementInfiniteLoad
  } = props;

  return (
    <ListWrapper>
      <Infinite
        elementHeight={20}
        useWindowAsScrollContainer={true}
        infiniteLoadBeginEdgeOffset={200}
        onInfiniteLoad={handleInfiniteLoad}
        loadingSpinnerDelegate={elementInfiniteLoad()}
        isInfiniteLoading={isInfiniteLoading}
      >
        {elements.map(element => (
          <div>
            <Button variant="outline-primary" href="/map">
              {element}
            </Button>
          </div>
        ))}
      </Infinite>
    </ListWrapper>
  );
};
