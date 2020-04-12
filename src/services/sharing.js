
import{storeJSONshared, retrieveJson} from './PODExtractor';  
import{ ldflexHelper} from "@utils";


export const saveSharedFile = (webId, notification) => {

    let namefile= notification.actor.webId.substring(8, notification.actor.webId.length - 16)
      let path= webId.substring(0, webId.length - 16)
      let jsonfile = `${path}/viade/shared/${namefile}.jsonld`;
      var summary =notification.summary.split(" ");
      let friendpath= notification.actor.webId.substring(0, notification.actor.webId.length - 16)
      var ruta =`${friendpath}/viade/routes/${summary[summary.length-1]}`; 
  
      ldflexHelper.resourceExists(jsonfile).then(function(result) {
        if(result===false){
                const jsonldfriend = 
                {"@context": {
                      "@version": 1.1,
                      "routes": {
                          "@container": "@list",
                          "@id": "viade:routes"
                      },
                      "viade": "http://arquisoft.github.io/viadeSpec/"
                  },
                  "routes": [
                      {
                          "@id": ruta
                          

                      }
                  ]
                }
              
                storeJSONshared(jsonldfriend, jsonfile, function(success){
                  if(success){
                  }
                  else{
                  }
                });
              
      }else{
          let routeJson="";
          retrieveJson(jsonfile).then(function(result) {
            routeJson = JSON.parse(result);
            routeJson.routes.push({"@id": ruta});
            storeJSONshared(routeJson, jsonfile, function(success){
              if(success){
                  alert("Se ha actualizado");
              }
              else{
                  alert("Fail");
              }
            });
          }) ;
      }
    })
  
  }