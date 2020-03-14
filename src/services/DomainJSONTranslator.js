import {Route, Resource, Comment, TrackPoint} from '../domain/domainClasses.js'

// TODO: Discuss if async makes sense here

export const loadMapInfo = async jsonUrl => {
    // Load JSON-LD from map
  
    var routeJson = {
        "@context": {
          "@version": 1.1,
          "comments": {
            "@container": "@list",
            "@id": "viade:comments",
          },
          "description": {
            "@id": "schema:description",
            "@type": "xs:string",
          },
          "media": {
            "@container": "@list",
            "@id": "viade:media",
          },
          "name": {
            "@id": "schema:name",
            "@type": "xs:string",
          },
          "points": {
            "@container": "@list",
            "@id": "viade:points",
          },
          "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
          "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
          "schema": "http://schema.org/",
          "viade": "http://arquisoft.github.io/viadeSpec/",
          "xsd": "http://www.w3.org/2001/XMLSchema#",
        },
        "comments": [
          {
            "@id": "http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.angelixus/routeComments/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.raupemol/routeComments/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>",
          },
        ],
        "description": "Route test 2",
        "media": [
          {
            "@id": "http://inrupt.luispc1998/routeMedia/image/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.angelixus/routeMedia/image/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.raupemol/routeMedia/video/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>",
          },
          {
            "@id": "http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>",
          },
        ],
        "name": "Route test 2",
        "points": [
          {
            "latitude": 45.123,
            "longitude": 34.121,
          },
          {
            "latitude": 46.123,
            "longitude": 34.121,
          },
          {
            "latitude": 47.123,
            "longitude": 34.121,
          },
          {
            "latitude": 48.123,
            "longitude": 32.121,
          },
          {
            "latitude": 49.123,
            "longitude": 34.121,
          },
          {
            "latitude": 40.123,
            "longitude": 32.121,
          },
          {
            "latitude": 50.123,
            "longitude": 33.121,
          },
          {
            "latitude": 53.123,
            "longitude": 34.121,
          },
          {
            "latitude": 54.123,
            "longitude": 34.121,
          },
          {
            "latitude": 55.123,
            "longitude": 35.121,
          },
          {
            "latitude": 57.123,
            "longitude": 30.121,
          },
          {
            "latitude": 56.123,
            "longitude": 26.121,
          },
          {
            "latitude": 53.123,
            "longitude": 25.121,
          },
          {
            "latitude": 55.123,
            "longitude": 20.121,
          },
          {
            "latitude": 51.123,
            "longitude": 15.121,
          },
        ],
      };
  
    var routeName = "";
    var routeDescription = "";
    var trackPointList = [];
    var resourceList = [];
    var commentList = [];
  
    for(var key in routeJson) {
        var value = routeJson[key]
  
        if(key == "name")
            routeName = value;
  
        if(key == "description")
            routeDescription = value;
  
        if(key == "points") {
            for(var latLong in value) {
                trackPointList.push(new TrackPoint(value[latLong].latitude, value[latLong].longitude));
            }
        }
  
        if(key == "comments") {
            for(var comment in value) {
                commentList.push(new Comment(value[comment]["@id"]));
            }
        }
  
        if(key == "media") {
            for(var media in value) {
                resourceList.push(new Resource(value[media]["@id"]));
            }
        }
    }
    var route = new Route({"name" : routeName, "description" : routeDescription, "itineray" : trackPointList, "resources" : resourceList, "comments" : commentList})
    return route;
};