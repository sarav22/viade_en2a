import { storeJSONshared, retrieveJson } from "./PODExtractor";
import { ldflexHelper } from "@utils";

const saveSharedFile = (webId, notification) => {
  let namefile = notification.actor.webId.substring(
    8,
    notification.actor.webId.length - 16
  );
  let path = webId.substring(0, webId.length - 16);
  let jsonfile = `${path}/viade/shared/${namefile}.jsonld`;
  var summary = notification.summary.split(" ");
  let friendpath = notification.actor.webId.substring(
    0,
    notification.actor.webId.length - 16
  );
  var ruta = `${friendpath}/viade/routes/${summary[summary.length - 1]}`;

  ldflexHelper.resourceExists(jsonfile).then(function(result) {
    if (result === false) {
      const jsonldfriend = {
        "@context": {
          "@version": 1.1,
          routes: {
            "@container": "@list",
            "@id": "viade:routes",
          },
          viade: "http://arquisoft.github.io/viadeSpec/",
        },
        routes: [
          {
            "@id": ruta,
          },
        ],
      };

      storeJSONshared(jsonldfriend, jsonfile, function(success) {
        if (success) {
        } else {
        }
      });
    } else {
      let routeJson = "";
      retrieveJson(jsonfile).then(function(result) {
        routeJson = JSON.parse(result);
        let routeExists = false;
        routeJson.routes.forEach((route)=>{
          if(route["@id"]===ruta){
            routeExists=true;
          }
        });
        if(routeExists===false){
          routeJson.routes.push({ "@id": ruta });
          storeJSONshared(routeJson, jsonfile, function(success) {
            if (success) {
              //
            } else {
              //
            }
          });
        }
      });
    }
  });
};

export const notificationsFile = (webId, n) => {
  let friendpath = webId.substring(0, webId.length - 16);
  let path = `${friendpath}/viade/notification.json`;
  ldflexHelper.resourceExists(path).then(function(result) {
    if (result === true) {
      insertNotificationsFile(path, webId, n);
    }
  });
};

const insertNotificationsFile = (path, webId, n) => {
  let routeJson = "";
  retrieveJson(path).then(function(result) {
    routeJson = JSON.parse(result);
    n.forEach((notification) => {
      let parsed = false;
      if (routeJson.notifications == null) {
        routeJson.notifications = [];
        routeJson.notifications.push({ "@id": notification.id });
      } else {
        routeJson.notifications.forEach((jsonNotification) => {
          if (jsonNotification["@id"] === notification.id) {
            
            parsed = true;
          }
        });
        if (parsed === false) {
          routeJson.notifications.push({ "@id": notification.id });
          saveSharedFile(webId, notification);
        }
      }
    });
    storeJSONshared(routeJson, path, function(success) {
      if (success) {
      }
    });
  });
};
