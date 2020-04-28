import {uploadResourceToPod, saveJsonLdWithId} from "../PODExtractor";
import parse from "../importing/DomainJSONLDParser";
import {Resource} from "../../domain/domainClasses";
export function uploadResourceToRoute(resource, route, callback){

        uploadResourceToPod(resource, function(fileUri) {        
            vinculateResourceIdToRouteFile(route, fileUri,callback);
        }
    )
}

export function vinculateResourceIdToRouteFile(route, fileUri,callback){
            route.resources.push(new Resource(fileUri));
            saveJsonLdWithId(parse(route), route.fileWebId, function(success) {
                callback(success);
            })
}


