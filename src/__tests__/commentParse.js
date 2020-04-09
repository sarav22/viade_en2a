import {loadCommentsFromRouteCommentsProperty} from "../services/DomainJSONTranslator"

var comments = []

var fileURI = "https://luispresacollada.solid.community/viade/comments/routeComments/comments_NuevaRuta_2a6645b8-039b-4d29-bb2b-93375b2be9a0.jsonld"

function storeResult(routes){
    comments=routes
}

/*
test("Parsing two tracks", () => {    
    return expect(loadCommentsFromRouteCommentsProperty(fileURI)).resolves.toBe(2)
})
*/
