import React, { Component, Fragment } from 'react';
import Map from './Map';
import LateralMenu from './LateralMenu';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { loadMapInfo } from "../../services/DomainJSONTranslator";


/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class MapComponent extends Component<Props> {


  constructor(props) {
    super(props);
    this.state = {loading:true, route:null, title:null}
  }

  componentDidMount() {

    loadMapInfo("https://carlosmanrique.solid.community/viade/routes/rutaDePrueba.txt")
    .then(ruta => {this.setState({loading: false, route:ruta})
                    
  })

    //const route = null;
    //loadMapInfo("https://luispresacollada.solid.community/viade/routes/route.txt").then(function (result){const route = result;console.log(route)})

    //console.log("log2"+ route)
  }

  componentDidUpdate(prevProps) {

  }

  ViewContent = route => {
    return (
      <Container fluid >
        <Row>
          <Col xs={6} md={4}>
            <LateralMenu route={route} />
          </Col>
  
          <Col xs={12} md={8}>
            <Map route={route} />
          </Col>
  
        </Row>
      </Container>
    )
  }


  render() {
    const {loading, route} = this.state;
    let that = this
    return (

     <Fragment>
        {loading ? "Loading..." : this.ViewContent(this.state.route)}
      </Fragment>
    );
  }
}
