import ldflex from '@solid/query-ldflex';
import {browserHistory} from 'react-router';


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
    const f = friend.toString().substring(8).split(".")[0];
    const s = friend.toString().substring(8).split(".")[1];
    const n = friend.toString().substring(8).split(".")[2].split("/")[0];
    browserHistory.push('/friendRoutes/'+ f +'/'+s + '/'+n);
    await reload();
  }  


  export function searchFriends(matchingString) {
    if (matchingString!==""){
      const filtered = this.state.friends.filter(f=>f.toLowerCase().includes(matchingString.toLowerCase()));
      this.setState({searchResults: filtered});
    }
  }
  
  const reload = () => {
    window.location.reload(true);
  }

