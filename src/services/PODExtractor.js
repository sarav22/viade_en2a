import auth from "solid-auth-client";
import FC from "solid-file-client";
import { v4 as uuidv4 } from "uuid";
import { getEmptyCommentsJsonString } from "../services/comments/commentsService";
import { comment } from "rdf-namespaces/dist/cal";
import { permissionHelper } from "@utils";
const fc = new FC(auth);

const commentsNamePrefix = "/comments_";

export const retrieveJson = async (jsonUrl) => {
  if (await fc.itemExists(jsonUrl)) {
    return await fc.readFile(jsonUrl);
  }
};

export const retrieveAllRoutes = async (personWebId) => {
  var routeURI = personWebId;
  var routeURIExtended =
    routeURI.substring(0, routeURI.length - 16) + "/viade/routes";
  var res = [];
  if (await fc.itemExists(routeURIExtended)) {
    res = await fc.readFolder(routeURIExtended);
    return res;
  } else {
    await fc.createFolder(routeURIExtended);
    return res;
  }
};

export const retrieveGroups = async (personWebId) => {
  var routeURI = personWebId;
  var routeURIExtended =
    routeURI.substring(0, routeURI.length - 16) + "/viade/groups";
  var res = [];
  if (await fc.itemExists(routeURIExtended)) {
    res = await fc.readFolder(routeURIExtended);
    return res;
  } else {
    await fc.createFolder(routeURIExtended);
    return res;
  }
};

export const storeJSONToPOD = async (jsonLD, callback) => {
  let session = await auth.currentSession();
  let userWebIdRoute = session.webId.substring(0, session.webId.length - 16) + '/viade/routes';
  let formattedName = jsonLD.name.replace(/ /g, "_");
  let fileName = formattedName + '_' + uuidv4() + '.jsonld';
  let fileURI = userWebIdRoute + '/' + fileName;


  // Mirar si existe la carpeta de comentarios, crearla sino
  // Crear el archivo de comentarios en ese directorio
  // Añadir al json ld de la ruta, la URI del archivo de comentarios de esa ruta.
  await createCommentsFileForNewRoute(session.webId.substring(0, session.webId.length - 16), fileName).then((commentsFileName) => {
    jsonLD.comments = commentsFileName;
  })
  //


  if (await fc.itemExists(userWebIdRoute)) {
    fc.createFile(fileURI, JSON.stringify(jsonLD), 'text/plain').then(fileCreated => {
      callback(true);
    }, err => { callback(false); });
  } else {
    await fc.createFolder(userWebIdRoute);
    fc.createFile(fileURI, JSON.stringify(jsonLD), 'text/plain').then(fileCreated => {
      callback(true);
    }, err => { callback(false); });
  }
}

export const storeJSONshared = async (jsonLD, fileURI, callback) => {
  fc.createFile(fileURI, JSON.stringify(jsonLD), 'text/plain').then(fileCreated => {
    callback(true);
  }, err => { callback(false); });

};

async function createCommentsFileForNewRoute(podURI, routeFileName) {
  let commentsFolder = podURI + "/viade/comments"; //add routeComments
  let commentsFileURI = commentsFolder + commentsNamePrefix + routeFileName;
  if (!(await fc.itemExists(commentsFolder))) {
    await fc.createFolder(commentsFolder);
  }
  await fc.createFile(
    commentsFileURI,
    JSON.stringify(getEmptyCommentsJsonString()),
    "text/plain"
  );
  return commentsFileURI;
}

export async function postCommentInPod(commentJson, routeComments, callback) {
  let session = await auth.currentSession();
  let author = session.webId;



  var routeCommentsFile = {};
  await retrieveJson(routeComments).then(function (result) {
    routeCommentsFile = JSON.parse(result);
  })

  routeCommentsFile.comments.push({ "text": commentJson.text, "dateCreated": commentJson.dateCreated, "author": author });

  //Overwrite the file.

  await fc
    .createFile(routeComments, JSON.stringify(routeCommentsFile), "text/plain")
    .then(
      (fileCreated) => {
        callback(true);
      }, err => { callback(false); });

}


export async function uploadResourceToPod(resource, callback) {
  let session = await auth.currentSession();
  let userWebIdRoute = session.webId.substring(0, session.webId.length - 16) + '/viade/resources';


  let aux = resource.name.split(".")

  let extension = "." + aux[aux.length - 1]


  let fileName = uuidv4() + extension;
  let fileURI = userWebIdRoute + '/' + fileName;



  if (await fc.itemExists(userWebIdRoute)) {


    fc.createFile(fileURI, resource, resource.type).then(response => {
      callback(response.url)
    }, err => { callback(null); }).then((response) => {
      permissionHelper.checkOrSetInboxAppendPermissions(
        fileURI,
        session.webId
      ).then(() => {
        permissionHelper.checkOrSetSettingsReadPermissions(
          fileURI,
          session.webId
        );
      })
    });

  } else {
    await fc.createFolder(userWebIdRoute);
    fc.createFile(fileURI, resource, resource.type).then(response => {
      callback(response.url);
    }, err => { callback(null); });
  }
}


export async function saveJsonLdWithId(jsonLd, Id, callback) {
  fc.createFile(Id, JSON.stringify(jsonLd), 'application/json').then(response => {
    callback(true);
  }, err => callback(false))
}
