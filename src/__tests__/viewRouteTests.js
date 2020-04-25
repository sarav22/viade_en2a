import React from 'react';
import { render, cleanup } from 'react-testing-library';
import LateralMenu from "@containers/Map/LateralMenu/LateralMenu.component.js";
import Map from "@containers/Map/Map/map.component.js";

import '@testing-library/jest-dom/';
import {TrackPoint, Resource, Comment, Route} from "../domain/domainClasses.js";

const webId =  "https://carlosmanrique.inrupt.net/profile/card#me";

const comments = [
    new Comment("http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.angelixus/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.raupemol/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>")
];


const media = [
    new Resource("http://inrupt.luispc1998/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.angelixus/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.raupemol/routeMedia/video/<comentarioConSuTipo>"),
    new Resource("http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>")
];

const points = [
    new TrackPoint(45.123, 34.121),
    new TrackPoint(46.123, 34.121),
    new TrackPoint(47.123, 34.121),
    new TrackPoint(48.123, 32.121),
    new TrackPoint(49.123, 34.121),
    new TrackPoint(40.123, 32.121),
    new TrackPoint(50.123, 33.121),
    new TrackPoint(53.123, 34.121),
    new TrackPoint(54.123, 34.121),
    new TrackPoint(55.123, 35.121),
    new TrackPoint(55.123, 34.121)
];

const params = {
    name:"Route test 1",
    description:"This is a test to see the view route",
    itinerary:points,
    comments:comments,
    resources:media

};

const route = new Route(params);




afterAll(cleanup);

const { container, getByTestId } = render(
    <>
        <Map {...{webId, route}}/>
        <LateralMenu {...{webId, route}} />
    </>
);

test('Renders component', () => {
    expect(container).toBeTruthy();
});

test('Renders tabs', () => {
    expect(getByTestId('tabs')).toBeTruthy();
    expect(getByTestId('commentsTab')).toBeTruthy();
    expect(getByTestId('multimediaTab')).toBeTruthy();
    expect(getByTestId('dataTab')).toBeTruthy();

});


test('Renders map', () => {
    expect(getByTestId('map')).toBeTruthy();
    expect(getByTestId('routeName').textContent).toBe('mapView.viewTitleRoute test 1'); 

});
