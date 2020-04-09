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
