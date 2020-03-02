class MapNode {

    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

class Resource {
    
    constructor(resourceUrl) {
        this.resourceUrl = resourceUrl;
    }
}

// TODO: Discuss and create comment structure
class Comment {

}

class MapTriplet {

    constructor(mapNodelist, resourceList, commentList) {
        this.mapNodelist = mapNodelist;
        this.resourceList = resourceList;
        this.commentList = commentList;
    }
}

export const loadMapInfo = jsonUrl => {
    // Load JSON-LD from map

    var routeJson = /*Call underneath layer to retrieve JSON using the jsonUrl/name*/0;

    // Parse JSON-LD into MapNodes, Resources and Comments

    var mapNodeList = [];
    var resourceList = [];
    var commentList = [];


    return new MapTriplet(mapNodeList, resourceList, commentList);
};


// TODO: Comment if async method makes sense
export const sendMapInfo = async mapTriplet => {

    // Take MapTriplet info and create JSON-LD


    // Send JSON-LD to underneath layer calling the needed method
}