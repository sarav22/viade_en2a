import { RouteSpec, TrackPoint, Comment } from '../../domain/DomainClasses';


function parseRouteJsonLD(routeSpec) {


    const comments = routeSpec.commentList.map(function (comment) {
        return { "@id": comment.resourceUrl };
    });

    const media = routeSpec.resourceList.map(function (media) {
        return { "@id": media.resourceUrl };
    });

    const points = routeSpec.itinerary.map(function (trackPoint) {
        return { "schema:latitude": trackPoint.latitude, "schema:longitude": trackPoint.longitude }
    });

    const routeJsonLD = {
        "@context": {
            "@version": 1.1, //Needed to be parsed as a 1.1, not 1.0

            //Namespaces that are relevant
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "schema": "http://schema.org/",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",

            // Context for the data

            "name": {
                "@id": "schema:name",
                "@type": "xs:string"
            },

            "description": {
                "@id": "schema:description",
                "@type": "xs:string" //Type coercion
            },

            "comments": {
                "@id": "viade:comments",
                "@container": "@list" //Order is important, not provided by default
            },

            "media": {
                "@id": "viade:media",
                "@container": "@list"
            },

            "points": {
                "@id": "viade:points",
                "@container": "@list"
            }

        },

        "name": routeSpec.name,
        "description": routeSpec.name,
        "points": routeSpec.itinerary,
        "comments": comments,
        "media": media

    }
    return routeJsonLD;

}
export default parseRouteJsonLD;