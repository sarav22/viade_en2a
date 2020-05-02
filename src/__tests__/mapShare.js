import React from "react";
import { render, cleanup } from "react-testing-library";
import { ShareButton } from "@containers/Map/ShareButton/shareButton.component";
import "@testing-library/jest-dom/";

const webId = "https://en2aviade.inrupt.net/profile/card#me";
const routeUrl = "https://en2aviade.inrupt.net/viade/routes/Mar_ab389e9b-d122-4a2d-b8b1-fe16e6172362.jsonld";
const friends = [
  "https://raulpemol.inrupt.net/profile/card#me",
  "https://carlosmanrique.inrupt.net/profile/card#me",
];
const images = ["img/icon/empty-profile.svg", "img/icon/empty-profile.svg"];

afterAll(cleanup);
const { container, getByTestId } = render(
  <ShareButton {...{ webId, routeUrl, friends, images }} />
);

test("Renders correctly", () => {
  expect(container).toBeTruthy();
  setTimeout(() => {
    expect(getByTestId("shareButton-container")).toBeTruthy();
  }, 10000);
});

test("Renders share button", () => {
  setTimeout(() => {
    expect(getByTestId("buttonShare")).toBeTruthy();
    expect(getByTestId("buttonWrapper")).toBeTruthy();
  }, 10000);
});

test("Renders friends buttons correctly", () => {
  setTimeout(() => {
      getByTestId("buttonShare").click();
    friends.map((friend) =>
      expect(getByTestId("buttonFriend" + friend)).toBeTruthy()
    );
    friends.map((friend) =>
      expect(getByTestId("imageContainer" + friend)).toBeTruthy()
    );
    friends.map((friend) => expect(getByTestId("img" + friend)).toBeTruthy());
  }, 10000);
  
});

test("Modal works", () => {
  setTimeout(() => {
    getByTestId("buttonShare").click();
    expect(getByTestId("modalShare")).toBeTruthy();
    expect(getByTestId("inputShare")).toBeTruthy();
    expect(getByTestId("closeShare")).toBeTruthy();
    expect(getByTestId("shareWith")).toBeTruthy();
  }, 10000);
  
});
