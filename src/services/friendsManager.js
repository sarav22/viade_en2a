import ldflex from "@solid/query-ldflex";
import { browserHistory } from "react-router";
import { Base64 } from "js-base64";
import { foaf } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";

export async function ldflexDeleter(friend, webId) {
  return ldflex[webId].knows.delete(ldflex[friend]);
}

export async function deleteFriend(event, friend, webId) {
  event.preventDefault();
  await ldflexDeleter(friend, webId);
  await reload();
}

export async function ldflexAdder(friend, webId) {
  return ldflex[webId].knows.add(ldflex[friend]);
}

export async function addFriend(event, friend, webId) {
  event.preventDefault();
  await ldflexAdder(friend, webId);
  await reload();
}

export async function viewProfile(event, friend) {
  event.preventDefault();
  window.location.replace(friend);
}

export async function viewRoutes(event, friend) {
  event.preventDefault();
  let f = friend.replace("https://", "");
  f = Base64.encode(f);
  browserHistory.push("/viade_en2a/#/friendRoutes/" + f);
  await reload();
}

const reload = () => {
  window.location.reload(true);
};

export async function isFriend(webId, actor) {
  if (actor === undefined) {
    return false;
  }
  const profileDoc = await fetchDocument(webId);
  const profile = profileDoc.getSubject(webId);
  const fs = profile.getAllRefs(foaf.knows);
  let found = false;
  fs.forEach((f) => {
    if (f === actor) found = true;
  });
  if (found === true) {
    return true;
  } else {
    return false;
  }
}

export function getName(friendWebId) {
  return friendWebId
    .toString()
    .substring(8)
    .split(".")[0];
}

export function getImgByWebId(friendWebId, images) {
  if (images !== undefined) {
    for (let i = 0; i < images.length; i++) {
      if (images[i].id === friendWebId) {
        return images[i].img;
      }
    }
  }
}
