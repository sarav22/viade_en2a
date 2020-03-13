// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/';
import parseRouteJsonLD from '../services/importing/DomainJSONLDParser.js'
import {TrackPoint, Resource, Comment, Route} from "../domain/DomainClasses.js"


const comments = [
    new Comment("http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.angelixus/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.raupemol/routeComments/<comentarioConSuTipo>"),
    new Comment("http://inrupt.luispc1998/routeComments/<comentarioConSuTipo>")
]


const media = [
    new Resource("http://inrupt.luispc1998/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.angelixus/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.raupemol/routeMedia/video/<comentarioConSuTipo>"),
    new Resource("http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>")
]

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
]

const params = {
    name:"Route test 1",
    description:"This is a test to see the output of the JsonLDConversor",
    itinerary:points,
    comments:comments,
    resources:media

}

const route = new Route(params)



test("Parsing example data", () =>{
    expect(parseRouteJsonLD(route)).toMatchSnapshot()
})



const media2 = [
    new Resource("http://inrupt.luispc1998/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.angelixus/routeMedia/image/<comentarioConSuTipo>"),
    new Resource("http://inrupt.raupemol/routeMedia/video/<comentarioConSuTipo>"),
    new Resource("http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>"),
    new Resource("http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>"),
    new Resource("http://inrupt.luispc1998/routeMedia/video/<comentarioConSuTipo>")
]

const points2 = [
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
    new TrackPoint(57.123, 30.121),
    new TrackPoint(56.123, 26.121),
    new TrackPoint(53.123, 25.121),
    new TrackPoint(55.123, 20.121),
    new TrackPoint(51.123, 15.121)
]

const params2 = {
    name:"Route test 2",
    description:"This is a test to see the output of the JsonLDConversor",
    itinerary:points2,
    comments:comments,
    resources:media2

}


const route2 = new Route(params2)



test("Parsing example data2", () =>{
    expect(parseRouteJsonLD(route2)).toMatchSnapshot()
})