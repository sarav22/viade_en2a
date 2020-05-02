import { Route, Resource, TrackPoint, CommentEntity } from '../domain/domainClasses.js';
import { retrieveJson, retrieveAllRoutes, storeJSONToPOD } from './PODExtractor.js';
import parseRouteJsonLD from './importing/DomainJSONLDParser.js';
import { comment } from 'rdf-namespaces/dist/cal';
import { resultComment } from 'rdf-namespaces/dist/schema';
import { getEmptyCommentsJsonString } from './comments/commentsService.js';

const ttl2jsonld = require('@frogcat/ttl2jsonld').parse;


export const loadMapInfo = async jsonUrl => {
    // Load JSON-LD from map

    var routeJson = "";

    //
    var commentList = [];
    var commentsFile = "";
    //

    var foundErrorOnParse = false;
    if (jsonUrl.substring(jsonUrl.length - 3) === "ttl") {
        await retrieveJson(jsonUrl).then(function (result) {
            try {
                let partiallySplitted = jsonUrl.split("routes")[1];
                routeJson = parseJsonFromTtl(result, partiallySplitted.substring(1, partiallySplitted.length - 4));
            } catch (e) {
                foundErrorOnParse = true;
            }
        });
    } else {
        await retrieveJson(jsonUrl).then(function (result) {
            try {
                routeJson = JSON.parse(result);
            } catch (e) {
                foundErrorOnParse = true;
            }
        });
    }

    if (!foundErrorOnParse) {
        var routeName = "";
        var routeDescription = "";
        var trackPointList = [];


        var resourceList = [];
        var imagesToDisplay = []
        var videosToDisplay = []
        var audiosToDisplay = []

        for (var key in routeJson) {
            var value = routeJson[key];

            if (key === "name")
                routeName = value;

            if (key === "description")
                routeDescription = value;

            if (key === "points") {
                for (var latLong in value) {
                    trackPointList.push(new TrackPoint(value[latLong]["latitude"], value[latLong]["longitude"]));
                }
            }

            if (key === "comments") {

                commentsFile = value;

                await loadCommentsFromRouteCommentsProperty(commentsFile).then((resultCommentList) => {
                    commentList = resultCommentList;
                })
                console.log("La lista");
                console.log(commentList);

            }

            if (key === "media") {
                for (var media in value) {
                    let resource = new Resource(value[media]["@id"]);
                    resourceList.push(resource);

                    if (resource.isAudio()) audiosToDisplay.push(resource);
                    if (resource.isImage()) imagesToDisplay.push(resource);
                    if (resource.isVideo()) videosToDisplay.push(resource);

                }
            }
        }


        var route = new Route({
            "name": routeName, "description": routeDescription, "itinerary": trackPointList, "resources": resourceList, "comments": commentsFile, //});
            "commentList": commentList
        });

        route.fileWebId = jsonUrl;
        route.imagesToDisplay = imagesToDisplay;
        route.videosToDisplay = videosToDisplay;
        route.audiosToDisplay = audiosToDisplay;

        return route;
    }
};

const parseJsonFromTtl = (ttlSource, fileName) => {
    var jsonFromLib = ttl2jsonld(ttlSource);
    var jsonRouteName = "";
    var jsonRouteDescription = "";
    var jsonRoutePoints = "";
    var jsonRouteMedia = [];
    var jsonRouteComments = "";

    if (jsonFromLib["@graph"]) {
        jsonRouteName = jsonFromLib["@graph"][0]["schema:name"]
        jsonRouteDescription = jsonFromLib["@graph"][0]["schema:description"]
        jsonRoutePoints = jsonFromLib["@graph"][0]["viade:point"].map(function (each) {
            return { "latitude": parseFloat(each["schema:latitude"]["@value"]), "longitude": parseFloat(each["schema:longitude"]["@value"]) };
        });

        jsonRouteMedia = jsonFromLib["@graph"].filter(each => {
            return each["@id"].includes("media");
        });

        jsonRouteMedia = jsonRouteMedia.map(each => {
            return { "@id": each["schema:contentUrl"]["@id"] };
        });

    } else {
        jsonRouteName = jsonFromLib["schema:name"]
        jsonRouteDescription = jsonFromLib["schema:description"]
        jsonRoutePoints = jsonFromLib["viade:point"].map(function (each) {
            return { "latitude": parseFloat(each["schema:latitude"]["@value"]), "longitude": parseFloat(each["schema:longitude"]["@value"]) };
        });
    }

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
            "longitude": {
                "@id": "schema:longitude",
                "@type": "xs:double"
            },
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "schema": "http://schema.org/",
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        },

        "name": jsonRouteName,
        "description": jsonRouteDescription,
        "points": jsonRoutePoints,
        "comments": jsonRouteComments,
        "media": jsonRouteMedia
    };

    storeJSONToPOD(routeJsonLD, function (res) {

    }, fileName);

    return routeJsonLD;
}

export const loadAllRoutes = async (personWebId) => {
    var filesObj = await retrieveAllRoutes(personWebId);
    if (filesObj.files) {
        var onlyJson = filesObj.files.filter(function (urlMap) {
            var splitted = urlMap.url.split("routes")[1].split('.')
            return splitted[splitted.length - 1] === "jsonld";
        }).map(function (urlJson) {
            return urlJson.url;
        });

        asyncParseTtl(onlyJson, filesObj.files);

        return onlyJson;
    }
    return filesObj;
};

const asyncParseTtl = async (jsonUrls, files) => {

    var webId = "";
    jsonUrls = jsonUrls.map(function (url) {
        var splitted = url.split("routes")[1].split('.')
        if (webId === "") {
            webId = url.split(splitted[0])[0]
        }
        return splitted[0]
    })

    var onlyTtl = files.filter(function (urlMap) {
        var splitted = urlMap.url.split("routes")[1].split('.')
        return splitted[splitted.length - 1] === "ttl";
    }).map(function (urlJson) {
        return urlJson.url
    }).map(function (urlJson) {
        var splitted = urlJson.split("routes")[1].split('.')
        if (webId === "") {
            webId = urlJson.split(splitted[0])[0]
        }
        return splitted[0]
    });

    var toParse = onlyTtl.filter(element => jsonUrls.indexOf(element) === -1)

    toParse = toParse.map(element => webId + element + ".ttl");

    toParse.forEach(ttlUrl => {
        retrieveJson(ttlUrl).then(function (result) {
            try {
                let partiallySplitted = ttlUrl.split("routes")[1];
                parseJsonFromTtl(result, partiallySplitted.substring(1, partiallySplitted.length - 4));
            } catch (e) {
            }
        });
    })
}

export const loadFriendRoutes = async (webId, filename) => {
    var routeUri = webId.substring(0, webId.length - 16) + "/viade/shared/" + filename + ".jsonld";

    var json = "";
    await retrieveJson(routeUri).then(function (result) {
        if (result != null)
            json = JSON.parse(result);
    });

    var routes = [];

    for (var key in json) {
        if (key === "routes") {
            var value = json[key];
            for (var route in value) {
                routes.push(value[route]["@id"]);
            }
        }
    }

    return routes;
};

export const saveRouteToPOD = async (routeObj, callback) => {
    var jsonLD = parseRouteJsonLD(routeObj);
    storeJSONToPOD(jsonLD, callback);
};

export async function loadCommentsFromRouteCommentsProperty(routeCommentsFile) {
    var commentList = [];
    var commentsFileJson;

    await retrieveJson(routeCommentsFile).then(function (result) {
        console.log(result);
        try {
            commentsFileJson = JSON.parse(result);
        } catch (error) {

        }
    })

    let comentarios = [];
    if (commentsFileJson) {
        if (commentsFileJson.comments) {
            comentarios = commentsFileJson.comments;
        }
    }

    for (var i = 0; i < comentarios.length; i++) {
        commentList.push(new CommentEntity(comentarios[i].text, comentarios[i].dateCreated, comentarios[i].author));
    }

    return commentList;
}


export const loadListInfo = async jsonUrl => {
    // Load JSON-LD from map

    var routeJson = "";

    try {
        await retrieveJson(jsonUrl).then(function (result) {
            routeJson = JSON.parse(result);
        })


        var routeName = "";
        var routeDescription = "";


        var resourceList = [];
        var imagesToDisplay = []

        for (var key in routeJson) {
            var value = routeJson[key];

            if (key === "name")
                routeName = value;

            if (key === "description")
                routeDescription = value;

            if (key === "media") {
                for (var media in value) {
                    let resource = new Resource(value[media]["@id"]);
                    resourceList.push(resource);

                    if (resource.isImage()) imagesToDisplay.push(resource);

                }
            }
        }
        var route = new Route({ "name": routeName, "description": routeDescription, "resources": resourceList });

        route.fileWebId = jsonUrl;
        route.imagesToDisplay = imagesToDisplay;


        return route;
    }
    catch (e) {
  
        return "error"
    }
};



/*

https://luispresacollada.solid.community/viade/comments/comments_Barrett_Spur_1_cf6a6323-26a6-44b4-ac92-663f1d0ab448.jsonld

export async function loadCommentsFromRouteCommentsProperty(routeCommentsFile){
    var commentList = []
    var commentsFileJson;

    await retrieveJson(routeCommentsFile).then(function(result){
        console.log(result)
        commentsFileJson = JSON.parse(result);
    })


    console.log("El array")
    console.log(commentsFileJson.comments)

    let comentarios = commentsFileJson.comments

    for(var i = 0; i< comentarios.length; i++){
        /*
        console.log("El comentario")
        console.log(comentarios[i])

        console.log("El comentario, con [@id]")
        console.log(comentarios[i]["@id"])
        //

       var commentJson = {}
       await retrieveJson(comentarios[i]["@id"]).then(function(commentFile){
           console.log(commentFile)
           commentJson = JSON.parse(commentFile);
       })
       commentList.push(new CommentEntity(commentJson.text, commentJson.dateCreated));

    }

    return commentList;
}
*/
