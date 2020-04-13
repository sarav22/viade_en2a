import { parseGpx, parseGpxFromFile } from "viade-gpx-parse";
import parseSuperString from "./gpxInput";
import { tracks } from "rdf-namespaces/dist/schema";
import {TrackPoint, Waypoint, Route} from "../../../domain/domainClasses";

export function gpxTest() {
    let gpxString = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>';
    gpxString += '<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="byHand" version="1.1" ';
    gpxString += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
    gpxString += 'xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">';

    gpxString += '<wpt lat="39.921055008" lon="3.054223107">';
    gpxString += '<ele>12.863281</ele>';
    gpxString += '<time>2005-05-16T11:49:06Z</time>';
    gpxString += '<name>Cala Sant Vicenç - Mallorca</name>';
    gpxString += '<sym>City</sym>';
    gpxString += '</wpt>';
    gpxString += '</gpx>';

    let string = parseSuperString()
    parseGpxToRoutes(string, function (routes) {
        console.log(routes);
    })
}

export function parseGpxToRoutes(gpxString, callback){

    parseGpx(gpxString, function (error, gpxData){
        var routes = [];
        var routeWaypoints = [];

        var waypoints = gpxData.waypoints;
        var tracks = gpxData.tracks;

        waypoints.forEach( (gpxWpt) => {
            routeWaypoints.push(new Waypoint(gpxWpt.name, gpxWpt.desc, gpxWpt.lat, gpxWpt.lon, gpxWpt.elevation));
        });

        tracks.forEach(track => {
            let route = parseRouteFromTrack(track);
            route.addWaypoints(routeWaypoints);       
            routes.push(route);
            
        });

        return callback(routes);
        
    })
}


function parseRouteFromTrack(track){
    var points = parsePointsOfTrack(track);

    let params = {
        name: track.name,
        description: track.description,
        waypoints: track.waypoints,
        itinerary: points
    };
    let testRoute = new Route(params);
    return testRoute;
}

function parsePointsOfTrack(track){
    var points = [];
    track.segments.forEach( (segment) => {
        segment.forEach(trackPoint => {
            points.push(new TrackPoint(trackPoint.lat, trackPoint.lon, trackPoint.elevation));
        });
    });
    return points;
}

function parseWaypointsOfGpx(Wpts){
    var waypoints = [];
    Wpts.forEach( (gpxWpt) => {
        waypoints.push(new Waypoint(gpxWpt.name, gpxWpt.desc, gpxWpt.lat, gpxWpt.lon, gpxWpt.elevation));
    });
    return waypoints;
}
export default gpxTest;