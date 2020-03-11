// TODO: Discuss if we should export every class or only the Route class.


export class TrackPoint {
    constructor( latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}


export class Resource {
    
    constructor(resourceUrl) {
        this.resourceUrl = resourceUrl;
    }
}

// TODO: Discuss and create comment structure
export class Comment {
    constructor(resourceUrl) {
        this.resourceUrl = resourceUrl;
    }
}

export class Route {

    constructor(mapNodelist, resourceList, commentList) {
        this.mapNodelist = mapNodelist;
        this.resourceList = resourceList;
        this.commentList = commentList ;
    }


}


export class RouteSpec {

    /**
     * You are supposed to pass a map with all the necessary information
     * @param {*} params 
     * 
     * Note the ifs due to the possibility of ommiting data and provide them afeterwards
     */
    constructor(params) {

        if (params.name){
            this.name = params.name;
        }

        if (params.description){
            this.description=params.description;
        }

        
        if (params.itinerary){
            this.itinerary = params.itinerary;
            
        }

        if (params.comments){
            this.commentList = params.comments;
        }

        if (params.resources){
            this.resourceList = params.resources;
        }
    }

        

    



}