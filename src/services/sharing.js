
import { AccessControlList } from '@inrupt/solid-react-components';


export function share(webId, route, agent){
  const permissions = [{
    agents: [agent],
    modes: [AccessControlList.MODES.READ]
  }];
  const acl = new AccessControlList(webId, route);
  acl.assignPermissions(permissions);
}