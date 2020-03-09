import {RouteSpec, Resource, Comment, TrackPoint} from '../domain/domainClasses.js'

// TODO: Discuss if async makes sense here
export const loadMapInfo = jsonUrl => {
    // Load JSON-LD from map

    var routeJson = /*Call underneath layer to retrieve JSON using the jsonUrl/name*/0;

    var routeName = "";
    var routeDescription = "";
    var trackPointList = [];
    var resourceList = [];
    var commentList = [];

    var parsedJson = JSON.parse(routeJson)

    for(var key in parsedJson) {
        var value = parsed[key]

        if(key == "name")
            routeName = value;

        if(key = ="description")
            routeDescription = value;

        if(key == "points") {
            for(var latLong in value) {
                trackPointList.push(new TrackPoint(/*To put, it depends*/, latLong.schema:latitude, latLong.schema:longitude));
            }
        }

        if(key == "comments") {
            for(var comment in value) {
                commentList.push(new Comment(comment.@id))
            }
        }

        if(key == "media") {
            for(var media in value) {
                resourceList.push(new Resource(media.@id))
            }
        }
    }

    return new RouteSpec(routeName, routeDescription, mapNodeList, commentList, resourceList);
};


// TODO: Comment if async method makes sense
export const sendMapInfo = async mapTriplet => {

    // Take Route info and create JSON-LD


    // Send JSON-LD to underneath layer calling the needed method
}