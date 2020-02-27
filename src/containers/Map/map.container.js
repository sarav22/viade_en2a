import React, { Component } from 'react';
import { MapPageContent } from './map.component';


    
/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class MapComponent extends Component<Props> {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "routeName",
      };
    }
  
    componentDidMount() {
 
    }
  
    componentDidUpdate(prevProps) {

    }
  
  
    render() {
      const { name } = this.state;
      const { webId } = this.props;
      return (
        <MapPageContent {...{ name, webId, }} />
      );
    }
  }
  