import { parseGpxToRoutes } from "../services/importing/gpx/gpxParser";
import generateWaypointsInput from "../services/importing/gpx/testingFiles/gpxInput";
import generateNoTrackInput from "../services/importing/gpx/testingFiles/gpxNoTracksInput";
import parseSuperString from "../services/importing/gpx/gpxInput";
import "@testing-library/jest-dom/";

var routesArray = [];

function emptyCallback(routes) {
  console.log(routes);
  routesArray = routes;
}

test("Parsing two tracks", () => {
  parseGpxToRoutes(parseSuperString(), emptyCallback);
  expect(routesArray.length).toBe(2);
});

test("Parsing just one track", () => {
  parseGpxToRoutes(generateWaypointsInput(), emptyCallback);
  expect(routesArray.length).toBe(1);
});

test("Parsing no track", () => {
  console.log(generateNoTrackInput());
  parseGpxToRoutes(generateNoTrackInput(), emptyCallback);
  expect(routesArray.length).toBe(0);
});

test("Parsing two tracks snapshot", () => {
  parseGpxToRoutes(parseSuperString(), emptyCallback);
  expect(routesArray).toMatchSnapshot();
});

test("Parsing just one track snapshot", () => {
  parseGpxToRoutes(generateWaypointsInput(), emptyCallback);
  expect(routesArray).toMatchSnapshot();
});

test("Parsing no track snapshot", () => {
  parseGpxToRoutes(generateNoTrackInput(), emptyCallback);
  expect(routesArray).toMatchSnapshot();
});
