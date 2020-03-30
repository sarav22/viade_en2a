
import { AccessControlList } from '@inrupt/solid-react-components';


export function shareRead(webId, route, agent){
  const permissions = [{
    agents: [agent],
    modes: [AccessControlList.MODES.READ]
  }];
  const acl = new AccessControlList(webId, route);
  acl.assignPermissions(permissions);
}


export function shareWrite(webId, route, agent){
  const permissions = [{
    agents: [agent],
    modes: [AccessControlList.MODES.READ, AccessControlList.MODES.WRITE]
  }];
  const acl = new AccessControlList(webId, route);
  acl.assignPermissions(permissions);
}