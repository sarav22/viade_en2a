import ldflex from '@solid/query-ldflex';
import {browserHistory} from 'react-router';
import { Base64 } from "js-base64";


 export async function ldflexDeleter(friend, webId){
     return ldflex[webId].knows.delete(ldflex[friend]);
  }

 export async function deleteFriend(event, friend, webId) {
    event.preventDefault();
    await ldflexDeleter(friend, webId);
    await reload();
  }

 export async function viewRoutes(event, friend) {
    event.preventDefault();
    let f = friend.replace("https://", "");
    f = Base64.encode(f);
    browserHistory.push('/viade_en2a/#/friendRoutes/'+ f);
    await reload();
  }  

  
  const reload = () => {
    window.location.reload(true);
  }

