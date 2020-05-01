import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { MapWrapper } from "./createRoute.style";
import {errorToaster, successToaster} from '@utils';
import Map from "./Map";
import LateralForm from "./LateralForm";
import {Route} from '../../domain/domainClasses.js'
import {saveRouteToPOD} from '../../services/DomainJSONTranslator.js';
import {withTranslation} from 'react-i18next';


export class CreateRoute extends Component<Props>{

    

    constructor(props) {
        super(props);
        const {t} = this.props;
        this.state = {
            name: "",
            description: "",
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


    handleSetName(newName) {
        console.log(newName)
        this.setState({ name: newName });
    }

    handleSetDescription(newDesc) {
        this.setState({ description: newDesc});
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

        const {t} = this.props;

        if(!this.state.name || this.state.name == ""){
            errorToaster(t('createRouteView.errors.nameEmpty'));
            return;
        }
        if(!this.state.polyline){
            errorToaster(t('createRouteView.errors.routeEmpty'));
            return;
        }

        var route = new Route({"name": this.state.name, "description":this.state.description,"itinerary": this.state.waypoints, "resources" : [], "comments" : []});

        let poly = this.state.polyline;
        poly.setMap(null);
        this.setState({ polyline: poly });
        console.log(route.name);
        saveRouteToPOD(route, function(success){
            if(success){
                successToaster(t('createRouteView.success'));
            }
            else{
                errorToaster(t('createRouteView.errors.error'));
            }
        });

        event.preventDefault();
    }

    render() {
        return (
            <MapWrapper>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={7} sm={8}>
                            <Map 
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMF5XiwVXHrXjoCp0EsBbGoeKW08lHoo0&libraries=drawing"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `800px`, border: `2px solid #fff`, margin: '20px auto', "max-height": "calc(100vh - 180px)", }} />}
                                mapElement={<div style={{ height: `100%` }} />}

                                setWaypoints={this.handleSetWaypoints} 
                                waypoints={this.state.waypoints}
                                setPolyline={this.handleSetPolyline}
                                getPolyline={this.handleGetPolyline}
                            />
                        </Col>

                        <Col xs={12} md={5} sm={4}>
                            <LateralForm setDescription={this.handleSetDescription} 
                                setName={this.handleSetName} 
                                handleSubmit={this.handleSubmit}
                                name={this.state.name}
                                description={this.state.description}
                            />
                        </Col>
                    </Row>
                </Container>
            </MapWrapper>
        );
    }
}