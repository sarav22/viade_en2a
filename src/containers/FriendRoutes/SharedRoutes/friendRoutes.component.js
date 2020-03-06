import React from 'react';
import { SharedRoutes } from './friendRoutes.style';

/**
 * Routes list UI component, containing the styled components for the lists of routes
 * @param props
 */
const SharedRoutes = props => {
    const { webId, friendWebId } = props;
    
    return (
  
      <div>
        <h1 class="friendHeaderBar">{friendWebId}</h1>
        <p>{webId}</p>
      </div>
  
    );
  
};

export default SharedRoutes;