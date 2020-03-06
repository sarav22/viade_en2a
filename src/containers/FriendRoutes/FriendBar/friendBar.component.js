import React from 'react';

const FriendBar = props => {
    const { friendWebId } = props;
    
    return (
  
      <div class="friendHeaderBar">
            <button>{friendWebId}</button>
      </div>
  
    );
  
  };

  export default FriendBar;