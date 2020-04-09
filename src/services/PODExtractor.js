import auth from 'solid-auth-client';
import FC from 'solid-file-client';
import { fax } from 'rdf-namespaces/dist/contact';
import { v4 as uuidv4 } from 'uuid';
import {getEmptyCommentsJsonString} from '../services/comments/commentsService';
import { comment } from 'rdf-namespaces/dist/cal';
const fc = new FC(auth);

const commentsNamePrefix = "/comments_";

export const retrieveJson = async (jsonUrl) => {
    if(await fc.itemExists(jsonUrl)) {
        return await fc.readFile(jsonUrl)
    }
}

export const retrieveAllRoutes = async (personWebId) => {
    var routeURI = personWebId
    var routeURIExtended = routeURI.substring(0, routeURI.length - 16) + '/viade/routes'
    var res = []
    if(await fc.itemExists(routeURIExtended)) {
        res = await fc.readFolder(routeURIExtended);
        return res
    } else {
        await fc.createFolder(routeURIExtended)
        return res
    }
}

export const storeJSONToPOD = async (jsonLD, callback) => {
    let session = await auth.currentSession();
    let userWebIdRoute = session.webId.substring(0, session.webId.length - 16) + '/viade/routes';
    let formattedName = jsonLD.name.replace(/ /g, "_");
    console.log(formattedName + " "+jsonLD.name)
    let fileName = formattedName + '_' + uuidv4() + '.jsonld';
    let fileURI = userWebIdRoute + '/' + fileName;


    // Mirar si existe la carpeta de comentarios, crearla sino
    // Crear el archivo de comentarios en ese directorio
    // Añadir al json ld de la ruta, la URI del archivo de comentarios de esa ruta.
    await createCommentsFileForNewRoute(session.webId.substring(0, session.webId.length - 16), fileName).then( (commentsFileName) => {
        jsonLD.comments = commentsFileName;
    })
    //


    if(await fc.itemExists(userWebIdRoute)) {
        fc.createFile(fileURI, JSON.stringify(jsonLD), 'text/plain').then( fileCreated => {
            callback(true);
        }, err => { callback(false); });
    } else {
        await fc.createFolder(userWebIdRoute);
        fc.createFile(fileURI, JSON.stringify(jsonLD), 'text/plain').then( fileCreated => {
            callback(true);
        }, err => { callback(false); });
    }
}



async function createCommentsFileForNewRoute(podURI, routeFileName){

    let commentsFolder = podURI + '/viade/comments'  //add routeComments
    let commentsFileURI = commentsFolder + commentsNamePrefix + routeFileName
    if (!(await fc.itemExists(commentsFolder))){
        await fc.createFolder(commentsFolder)
    }
    await fc.createFile(commentsFileURI, JSON.stringify(getEmptyCommentsJsonString()), 'text/plain')
    return commentsFileURI;
}



export async function postCommentInPod(commentJson, routeComments, callback){


    var routeCommentsFile = {}
    await retrieveJson(routeComments).then(function(result) {
        routeCommentsFile = JSON.parse(result);
    }) 

    routeCommentsFile.comments.push({"text" : commentJson.text, "dateCreated" : commentJson.dateCreated})

    //Overwrite the file.

    await fc.createFile(routeComments, JSON.stringify(routeCommentsFile), 'text/plain').then(fileCreated => {
        callback(true);
    }, err => {callback(false);});

}


/*
export async function postCommentInPod(commentJson, routeComments, callback){

    // Create the comment
    let session = await auth.currentSession();
    let folder = session.webId.substring(0, session.webId.length - 16) + '/viade/comments/myComments';
    let fileName = uuidv4() + '.jsonld';
    let fileURI = folder + '/' + fileName;

    if (!(await fc.itemExists(folder))){
        await fc.createFolder(folder)
    }
    await fc.createFile(fileURI, JSON.stringify(commentJson), 'text/plain').then(fileCreated => {
        console.log("Created file: " + fileCreated)
    })

    // Link it with the route comments file.

    var routeCommentsFile = ""
    await retrieveJson(routeComments).then(function(result) {
        routeCommentsFile = JSON.parse(result);
    }) 

    routeCommentsFile.comments.push({"@id" : fileURI})

    //Overwrite the file.

    await fc.createFile(routeComments, JSON.stringify(routeCommentsFile), 'text/plain').then(fileCreated => {
        callback(true);
    }, err => {callback(false);});
} */
