import Route from '../domain/domainClasses.js'
import MapNode from '../domain/domainClasses.js'
import Resource from '../domain/domainClasses.js'
import Comment from '../domain/domainClasses.js'

// TODO: Discuss if async makes sense here
export const loadMapInfo = jsonUrl => {
    // Load JSON-LD from map

    var routeJson = /*Call underneath layer to retrieve JSON using the jsonUrl/name*/0;

    // Parse JSON-LD into MapNodes, Resources and Comments

    var mapNodeList = [];
    var resourceList = [];
    var commentList = [];


    return new Route(mapNodeList, resourceList, commentList);
};


// TODO: Comment if async method makes sense
export const sendMapInfo = async mapTriplet => {

    // Take MapTriplet info and create JSON-LD


    // Send JSON-LD to underneath layer calling the needed method
}