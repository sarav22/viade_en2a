import auth from 'solid-auth-client';
import FC from 'solid-file-client';
const fc = new FC(auth);

export const retrieveJson = async (jsonUrl) => {
    if(await fc.itemExists(jsonUrl)) {
        return await fc.readFile(jsonUrl)
    }
}