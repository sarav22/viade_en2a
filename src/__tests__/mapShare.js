import React from 'react';
import { render, cleanup, fireEvent} from 'react-testing-library';
import { ShareButton } from '@containers/Map/ShareButton/shareButton.component';
import '@testing-library/jest-dom/';
import {Route, TrackPoint} from '../domain/domainClasses.js'

const webId =  "https://podejemplo2.inrupt.net/profile/card#me";
const route =  new Route({"name" : "name", "description" : "description", "itinerary" : [new TrackPoint(10,5)], "resources" : null, "comments" : null});
const routeUrl =  "https://podejemplo2.inrupt.net/viade/routes/ruta.txt";


afterAll(cleanup);
    const { container, getByTestId } = render(
    <ShareButton {...{webId, routeUrl}} />
    
);

test('Renders correctly', () => {
    expect(container).toBeTruthy();
});

test('Renders share button', () =>{
        expect(getByTestId('buttonShare')).toBeTruthy();
});

test('Modal works', () =>{
    
    getByTestId('buttonShare').click();
    expect(getByTestId('modalShare')).toBeTruthy();
    getByTestId('closeShare').click();
    fireEvent.input(getByTestId('inputShare'), 'https://raulpemol.inrupt.net/profile/card#me' );
    getByTestId('shareWith').click(); 
    expect(getByTestId('modalShare')).toBeTruthy();
    
});

