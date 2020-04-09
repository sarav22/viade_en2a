import {Route, Resource, Comment, TrackPoint, CommentEntity} from '../domain/domainClasses.js'
import {retrieveJson, retrieveAllRoutes, storeJSONToPOD} from './PODExtractor.js'
import parseRouteJsonLD from './importing/DomainJSONLDParser.js';
import { comment } from 'rdf-namespaces/dist/cal';
import { resultComment } from 'rdf-namespaces/dist/schema';


// TODO: Discuss if async makes sense here

export const loadMapInfo = async jsonUrl => {
    // Load JSON-LD from map
  
    var routeJson = ""

    //
    var commentsJson = {};
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
  
    for(var key in routeJson) {
        var value = routeJson[key]
  
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
           console.log("La lista")
           console.log(commentList)
           
        }
  
        if(key === "media") {
            for(var media in value) {
                resourceList.push(new Resource(value[media]["@id"]));
            }
        }
    }


    var route = new Route({"name" : routeName, "description" : routeDescription, "itinerary" : trackPointList, "resources" : resourceList, "comments" : commentsFile, //});
     "commentList" : commentList});

    return route;
};

export const loadAllRoutes = async (personWebId) => {
  var filesObj = await retrieveAllRoutes(personWebId);
  if(filesObj.files)
    return filesObj.files.map(function(urlMap) {
      return urlMap.url
    });
  return filesObj;
}

export const saveRouteToPOD = async (routeObj, callback) => {
    var jsonLD = parseRouteJsonLD(routeObj);
    storeJSONToPOD(jsonLD, callback);
}

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
       commentList.push(new CommentEntity(comentarios[i].text, comentarios[i].dateCreated))
    }

    return commentList;
}

/*
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
