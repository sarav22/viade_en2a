import React, { Component } from 'react';
import Map from './Map';
import LateralMenu from './LateralMenu';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import {loadMapInfo} from "../../services/DomainJSONTranslator";


/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class MapComponent extends Component<Props> {


  constructor(props){
    super(props);
	}

  componentDidMount() {
    const route = null;
    loadMapInfo("https://carlosmanrique.solid.community/viade/routes/rutaDePrueba.txt").then(function (result){const route = result;console.log(route)})
    
    console.log("log2"+ route)
  }

  componentDidUpdate(prevProps) {

  }


  render() {

    return (
      <Container fluid >
        <Row>

          <Col xs={6} md={4}>
            <LateralMenu  route={this.route}/>
          </Col>

          <Col xs={12} md={8}>
            <Map route={this.route} />
          </Col>

        </Row>

      </Container>
    );
  }
}
