import auth from 'solid-auth-client';
import FC from 'solid-file-client';
const fc = new FC(auth);

export const retrieveJson = async (jsonUrl) => {
    if(await fc.itemExists(jsonUrl)) {
        return await fc.readFile(jsonUrl)
    }
}

export const retrieveAllRoutes = async () => {
    let session = await auth.currentSession()
    var routeURI = session.webId.toString()
    var routeURIExtended = routeURI.substring(0, routeURI.length - 16) + '/viade/routes'
    var res = []
    if(await fc.itemExists(routeURIExtended)) {
        res = await fc.readFolder(routeURIExtended);
        return res
    } else {
        await fc.createFolder(routeURIExtended)
        return res
    }
}