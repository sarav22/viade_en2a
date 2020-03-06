import React, { Component } from 'react';
import SharedRoutes from "./SharedRoutes";
import FriendBar from "./FriendBar";


export class FriendRoutesComponent extends Component<Props> {

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }


  render() {
    const webId  = "98765"/*this.props.webId*/;
    const friendWebId = "123456"/*this.props.friendWebId*/;
    
    return (
      <div>  
        <div>
            <FriendBar friend={friendWebId}></FriendBar>
        </div>
        <div>

          <div xs={9} md={6}>
            <SharedRoutes {...{ webId, friendWebId}}/>
          </div>

          <div xs={9} md={6}>
            <SharedRoutes {...{ friendWebId, webId, }} />
          </div>

        </div>

      </div>
    );
  }
}