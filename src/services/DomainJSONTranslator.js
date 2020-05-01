import {Route, Resource, TrackPoint, CommentEntity} from '../domain/domainClasses.js';
import {retrieveJson, retrieveAllRoutes, storeJSONToPOD} from './PODExtractor.js';
import parseRouteJsonLD from './importing/DomainJSONLDParser.js';


// TODO: Discuss if async makes sense here

export const loadMapInfo = async jsonUrl => {
    // Load JSON-LD from map
  
    var routeJson = "";

    //
    var commentList = [];
    var commentsFile = "";
    //
    await retrieveJson(jsonUrl).then(function(result) {
      routeJson = JSON.parse(result);
    }) 
    
    var routeName = "";
    var routeDescription = "";
    var trackPointList = [];


    var resourceList = [];
    var imagesToDisplay = []
    var videosToDisplay = []
    var audiosToDisplay = []

    for(var key in routeJson) {
        var value = routeJson[key];
  
        if(key === "name")
            routeName = value;
  
        if(key === "description")
            routeDescription = value;
  
        if(key === "points") {
            for(var latLong in value) {
                trackPointList.push(new TrackPoint(value[latLong]["latitude"], value[latLong]["longitude"]));
            }
        }
  
        if(key === "comments") {
       
           commentsFile = value;
           
           await loadCommentsFromRouteCommentsProperty(commentsFile).then( (resultCommentList) => {
                commentList = resultCommentList;
           })
           console.log("La lista");
           console.log(commentList);
           
        }
  
        if(key === "media") {
            for(var media in value) {
                let resource = new Resource(value[media]["@id"]);
                resourceList.push(resource);

                if(resource.isAudio()) audiosToDisplay.push(resource);
                if(resource.isImage()) imagesToDisplay.push(resource);
                if(resource.isVideo()) videosToDisplay.push(resource);
                
            }
        }
    }




    var route = new Route({"name" : routeName, "description" : routeDescription, "itinerary" : trackPointList, "resources" : resourceList, "comments" : commentsFile, //});
     "commentList" : commentList});

     route.fileWebId = jsonUrl;
     route.imagesToDisplay = imagesToDisplay;
     route.videosToDisplay = videosToDisplay;
     route.audiosToDisplay = audiosToDisplay;
    return route;
};




export const loadAllRoutes = async (personWebId) => {
  var filesObj = await retrieveAllRoutes(personWebId);
  if(filesObj.files)
    return filesObj.files.map(function(urlMap) {
      return urlMap.url;
    });
  return filesObj;
};

export const loadFriendRoutes = async (webId, filename) => {
    var routeUri = webId.substring(0, webId.length - 16) + "/viade/shared/" + filename + ".jsonld";
    
    var json = "";
    await retrieveJson(routeUri).then(function(result) {
        if(result != null)
            json = JSON.parse(result);
    });

    var routes = [];

    for(var key in json){
        if(key === "routes"){
            var value = json[key];
            for(var route in value){
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

export async function loadCommentsFromRouteCommentsProperty(routeCommentsFile){
    var commentList = [];
    var commentsFileJson; 
    
    await retrieveJson(routeCommentsFile).then(function(result){
        console.log(result);
        try {
            commentsFileJson = JSON.parse(result);
        } catch(error) {

        }
    })
    
    let comentarios = [];
    if(commentsFileJson) {
        if(commentsFileJson.comments) {
            comentarios = commentsFileJson.comments;
        }
    }

    for(var i = 0; i< comentarios.length; i++){
       commentList.push(new CommentEntity(comentarios[i].text, comentarios[i].dateCreated, comentarios[i].author));
    }

    return commentList;
}


export const loadListInfo = async jsonUrl => {
    // Load JSON-LD from map
  
    var routeJson = "";
    await retrieveJson(jsonUrl).then(function(result) {
      routeJson = JSON.parse(result);
    }) 
    
    var routeName = "";
    var routeDescription = "";


    var resourceList = [];
    var imagesToDisplay = []

    for(var key in routeJson) {
        var value = routeJson[key];
  
        if(key === "name")
            routeName = value;
  
        if(key === "description")
            routeDescription = value;           
  
        if(key === "media") {
            for(var media in value) {
                let resource = new Resource(value[media]["@id"]);
                resourceList.push(resource);

                if(resource.isImage()) imagesToDisplay.push(resource);
            }
        }
    }

    var route = new Route({"name" : routeName, "description" : routeDescription, "resources" : resourceList });

     route.fileWebId = jsonUrl;
     route.imagesToDisplay = imagesToDisplay;
    return route;
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
