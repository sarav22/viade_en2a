// TODO: Discuss if we should export every class or only the Route class.

export default class MapNode {

    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default class Resource {
    
    constructor(resourceUrl) {
        this.resourceUrl = resourceUrl;
    }
}

// TODO: Discuss and create comment structure
export default class Comment {

}

export default class Route {

    constructor(mapNodelist, resourceList, commentList) {
        this.mapNodelist = mapNodelist;
        this.resourceList = resourceList;
        this.commentList = commentList;
    }
}