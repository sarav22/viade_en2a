

function parseRouteJsonLD(routeSpec) {


    const comments = routeSpec.comments.map(function (comment) {
        return { "@id": comment.resourceUrl };
    });

    const media = routeSpec.resources.map(function (media) {
        return { "@id": media.resourceUrl };
    });

    const points = routeSpec.itinerary.map(function (trackPoint) {
        return { "latitude": trackPoint.latitude, "longitude": trackPoint.longitude }
    });

    const routeJsonLD = {
        "@context": {
            "@version": 1.1,
            "comments": {
                "@container": "@list",
                "@id": "viade:comments"
            },
            "description": {
                "@id": "schema:description",
                "@type": "xs:string"
            },
            "media": {
                "@container": "@list",
                "@id": "viade:media"
            },
            "name": {
                "@id": "schema:name",
                "@type": "xs:string"
            },
            "points": {
                "@container": "@list",
                "@id": "viade:points"
            },
            "latitude": {
                "@id": "schema:latitude",
                "@type": "xs:double"
            },
            "latitude": {
                "@id": "schema:longitude",
                "@type": "xs:double"
            },
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "schema": "http://schema.org/",
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        },

        "name": routeSpec.name,
        "description": routeSpec.description,
        "points": points,
        "comments": comments,
        "media": media

    }
    return routeJsonLD;

}
export default parseRouteJsonLD;