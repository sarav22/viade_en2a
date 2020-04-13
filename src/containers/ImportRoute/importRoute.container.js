import React, { Component, Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Map from "./Map";
import MapEmpty from "./MapEmpty";
import LateralMenu from "./LateralMenu";
import {ImportWrapper} from './importRoute.style';

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

    viewRoute = routeArray => {
        return (
            <ImportWrapper>
                            <Container fluid>
                <Row>
                    <Col xs={6} md={4}>
                        <LateralMenu />
                    </Col>

                    <Col xs={12} md={8}>
                        <Map routeArray={routeArray}></Map>
                     </Col>
                </Row>
            </Container>
            </ImportWrapper>
        );
    }

    render() {
        const {importedRoute} = this.state;
        return (
            <Fragment>
              {!importedRoute ?          
              <ImportWrapper>
                <Container fluid>
                <Row>
                    <Col xs={6} md={4}>
                        <LateralMenu setRoute={this.setRoute}/>
                    </Col>

                    <Col xs={12} md={8}>
                        <MapEmpty centralLat={40.411104} centrarLong={-3.705367}></MapEmpty>
                     </Col>
                </Row>
                </Container>
              </ImportWrapper>    : this.viewRoute(this.state.route)}
            </Fragment>
          );
    }
}