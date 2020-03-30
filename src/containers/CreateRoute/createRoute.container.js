import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Map from "./Map";
import LateralForm from "./LateralForm";
import {Route} from '../../domain/domainClasses.js'

import {saveRouteToPOD} from '../../services/DomainJSONTranslator.js'

export class CreateRoute extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            name: "The name of the route",
            description: "The description of the route",
            waypoints: [],
            polyline:null
        };

        this.handleSetName = this.handleSetName.bind(this);
        this.handleSetDescription = this.handleSetDescription.bind(this);
        this.handleSetWaypoints = this.handleSetWaypoints.bind(this);
        this.handleSetPolyline = this.handleSetPolyline.bind(this);
        this.handleGetPolyline = this.handleGetPolyline.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSetName(event) {
        this.setState({ name: event.target.name });
    }

    handleSetDescription(event) {
        this.setState({ description: event.target.description });
    }

    handleSetWaypoints(list) {
        this.setState({ waypoints: list });
    }

    handleSetPolyline(poly) {
        this.setState({ polyline: poly });
    }

    handleGetPolyline() {
        return this.state.polyline;
    }

    handleSubmit(event) {
        var route = new Route({"name": this.state.name, "description":this.state.description,"itinerary": this.state.waypoints, "resources" : [], "comments" : []});

        let poly = this.state.polyline;
        poly.setMap(null);
        this.setState({ polyline: poly });

        saveRouteToPOD(route, function(success){
            if(success){
                alert("La ruta se ha guardado en el pod: OK!");
            }
            else{
                alert("Mierda, hubo un problema y no se pudo guardar");
            }
        });

        event.preventDefault();
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={6} md={4}>
                        <LateralForm setDescription={this.handleSetDescription} 
                            setName={this.handleSetName} 
                            handleSubmit={this.handleSubmit}
                            name={this.state.name}
                            description={this.state.description}
                         />
                    </Col>

                    <Col xs={12} md={8}>
                        <Map 
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0&libraries=drawing"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `800px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}

                            setWaypoints={this.handleSetWaypoints} 
                            waypoints={this.state.waypoints}
                            setPolyline={this.handleSetPolyline}
                            getPolyline={this.handleGetPolyline}
                        />
                     </Col>
                </Row>
            </Container>
        );
    }
}