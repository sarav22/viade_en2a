import { parseGpx } from "viade-gpx-parse";
import { TrackPoint, Waypoint, Route } from "../../../domain/domainClasses";

export function parseGpxToRoutes(gpxString, callback) {
  parseGpx(gpxString, function(error, gpxData) {
    var routes = [];
    var routeWaypoints = [];

    var waypoints = gpxData.waypoints;
    var tracks = gpxData.tracks;

    waypoints.forEach((gpxWpt) => {
      routeWaypoints.push(
        new Waypoint(
          gpxWpt.name,
          gpxWpt.desc,
          gpxWpt.lat,
          gpxWpt.lon,
          gpxWpt.elevation
        )
      );
    });

    tracks.forEach((track) => {
      let route = parseRouteFromTrack(track);
      route.addWaypoints(routeWaypoints);
      routes.push(route);
    });

    return callback(routes);
  });
}

function parseRouteFromTrack(track) {
  var points = parsePointsOfTrack(track);

  let params = {
    name: track.name,
    description: track.description,
    waypoints: track.waypoints,
    itinerary: points,
  };
  let testRoute = new Route(params);
  return testRoute;
}

function parsePointsOfTrack(track) {
  var points = [];
  track.segments.forEach((segment) => {
    segment.forEach((trackPoint) => {
      points.push(
        new TrackPoint(trackPoint.lat, trackPoint.lon, trackPoint.elevation)
      );
    });
  });
  return points;
}
