import React, { Component, Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Map from "./Map";
import MapEmpty from "./MapEmpty"
import LateralMenu from "./LateralMenu";

export class ImportRoute extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            importedRoute: false,
            route: null
        }
    }

    setRoute = routeImported => {
        this.setState({importedRoute: true, route: routeImported});
    }

    viewRoute = route => {
        return (
            <Container fluid>
                <Row>
                    <Col xs={6} md={4}>
                        <LateralMenu />
                    </Col>

                    <Col xs={12} md={8}>
                        <Map route={route}></Map>
                     </Col>
                </Row>
            </Container>
        );
    }

    render() {
        const {importedRoute} = this.state;
        return (
            <Fragment>
              {!importedRoute ?             
              <Container fluid>
                <Row>
                    <Col xs={6} md={4}>
                        <LateralMenu viewRoute={this.viewRoute}/>
                    </Col>

                    <Col xs={12} md={8}>
                        <MapEmpty centralLat={40.411104} centrarLong={-3.705367}></MapEmpty>
                     </Col>
                </Row>
            </Container> : this.viewRoute(this.state.route)}
            </Fragment>
          );
    }
}