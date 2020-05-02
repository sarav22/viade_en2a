import auth from "solid-auth-client";
import FC from "solid-file-client";
const fc = new FC(auth);

export const retrieveAllGroups = async (webId) => {
  var routeURI = webId;
  var routeURIExtended =
    routeURI.substring(0, routeURI.length - 16) + "/viade/groups";
  var groups = [];
  if (await fc.itemExists(routeURIExtended)) {
    groups = await fc.readFolder(routeURIExtended);
    return groups;
  } else {
    await fc.createFolder(routeURIExtended);
    return groups;
  }
};

export const parseGroup = async (url) => {
  let urls = [];
  var result = await fc.readFile(url);
  JSON.parse(result).users.forEach((element) => {
    urls.push(element.url);
  });
  return urls;
};

export const getGroupName = async (group) => {
  var result = await fc.readFile(group);
  let json = JSON.parse(result);
  return json.name;
};

export const checkWebId = async (webId) => {
  return await fc.itemExists(webId);
};

export const addWebIdToGroup = async (webId, group) => {
  let file = await fc.readFile(group);
  let json = JSON.parse(file);
  for (var prop in json.users) {
    if (json.users.hasOwnProperty(prop)) {
      if (json.users[prop].url === webId) {
        return;
      }
    }
  }
  json.users[json.users.length] = { url: webId };
  return await fc.createFile(group, JSON.stringify(json), "text/plain");
};

export const deleteGroupWithURL = async (group) => {
  return await fc.deleteFile(group);
};

export const removeFromGroup = async (webId, group) => {
  let file = await fc.readFile(group);
  let json = JSON.parse(file);
  for (var prop in json.users) {
    if (json.users.hasOwnProperty(prop)) {
      if (json.users[prop].url === webId) {
        delete json.users[prop];
      }
    }
  }
  json.users = json.users.filter(function(user) {
    return user;
  });
  return await fc.createFile(group, JSON.stringify(json), "text/plain");
};

export const createNewGroup = async (webId, newName) => {
  let file = {
    "@context": {
      "@version": 1.1,
      users: { "@container": "@list", "@id": "schema:Person" },
      name: { "@id": "schema:name", "@type": "xs:string" },
      url: { "@id": "schema:url", "@type": "xs:string" },
      schema: "http://schema.org/",
      xsd: "http://www.w3.org/2001/XMLSchema#",
    },
    name: "",
    users: [],
  };
  file.name = newName;
  var routeURI = webId;
  var routeURIExtended =
    routeURI.substring(0, routeURI.length - 16) + "/viade/groups";
  let finalURL = routeURIExtended + "/" + newName + ".txt";
  await fc.createFile(finalURL, JSON.stringify(file), "text/plain");
  return finalURL;
};

export const renameGroupTo = async (group, nameInput) => {
  let file = await fc.readFile(group);
  let json = JSON.parse(file);
  json.name = nameInput;
  return await fc.createFile(group, JSON.stringify(json), "text/plain");
};
