import React from "react";
import { render, cleanup } from "react-testing-library";
import { SearchFriendsContent } from "@containers/ManageFriends/searchFriends.component";
import "@testing-library/jest-dom/";

const webId = "https://mariaflorez.solid.community/profile/card#me";

var searchResults = ["https://raulpemol.inrupt.net/profile/card#me"];

afterAll(cleanup);
const { container, getByTestId } = render(
  <SearchFriendsContent {...{ webId, searchResults }} />
);

test("Renders correctly", () => {
  expect(container).toBeTruthy();
  expect(getByTestId("searchFriends-component")).toBeTruthy();
});

test("Renders friends buttons correctly", () => {
  searchResults.map((friend) =>
    expect(getByTestId("buttonFriend" + friend)).toBeTruthy()
  );
});
