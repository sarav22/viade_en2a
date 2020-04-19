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

export const checkWebId = async (webId) => {
  return await fc.itemExists(webId);
};

export const addWebIdToGroup = async (webId, group) => {
  let file = await fc.readFile(group);
  let json = JSON.parse(file);
  json.users[json.users.length] = { url: webId };
  await fc.createFile(group, JSON.stringify(json), "text/plain");
  console.log("asd");
};
