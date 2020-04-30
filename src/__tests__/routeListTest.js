import React from "react";
import { render, cleanup } from "react-testing-library";
import { InfiniteList } from "@components";
import { ListItem } from "@containers/RouteList/routeList.container";
import "@testing-library/jest-dom/";
import { Base64 } from "js-base64";

let elements = [{ url: "url1" }, { url: "url2" }];

function buildElements() {
  var build = [];
  for (var i = 0; i < elements.length; i++) {
    build.push(<ListItem key={i} num={i} url={elements[i].url} />);
  }
  return build;
}

afterAll(cleanup);
const { container, getByTestId } = render(
  <InfiniteList
    {...{
      elements: buildElements(),
      isInfiniteLoading: false,
      handleInfiniteLoad: function() {},
      elementInfiniteLoad: function() {}
    }}
  />
);

test("Renders correctly", () => {
  expect(container).toBeTruthy();
  expect(getByTestId("infiniteList-container")).toBeTruthy();
});

test("Renders list items correctly", () => {
  elements.map(element =>
    expect(getByTestId("route" + Base64.encode(element.url))).toBeTruthy()
  );
});
