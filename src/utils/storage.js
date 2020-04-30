import data from "@solid/query-ldflex";
import { AccessControlList } from "@inrupt/solid-react-components";
import { resourceExists, createDoc, createDocument } from "./ldflex-helper";
import { storageHelper, errorToaster, permissionHelper } from "@utils";
import auth from 'solid-auth-client';
import FC from 'solid-file-client';

import { namedNode } from "@rdfjs/data-model";
const fc = new FC(auth);
const appPath = "viade/";

/**
 * Creates a valid string that represents the application path. This is the
 * default value if no storage predicate is discovered
 * @param webId
 * @param path
 * @returns {*}
 */
export const buildPathFromWebId = (webId, path) => {
  if (!webId) return false;
  const domain = new URL(typeof webId === "object" ? webId.webId : webId)
    .origin;
  return `${domain}/${path}`;
};

/**
 * Helper function to check for the user's pod storage value. If it doesn't exist, we assume root of the pod
 * @returns {Promise<string>}
 */
export const getAppStorage = async webId => {
  const podStoragePath = await data[webId].storage;
  let podStoragePathValue =
    podStoragePath && podStoragePath.value.trim().length > 0
      ? podStoragePath.value
      : "";

  // Make sure that the path ends in a / so it is recognized as a folder path
  if (podStoragePathValue && !podStoragePathValue.endsWith("/")) {
    podStoragePathValue = `${podStoragePathValue}/`;
  }

  // If there is no storage value from the pod, use webId as the backup, and append the application path from env
  if (!podStoragePathValue || podStoragePathValue.trim().length === 0) {
    const url = buildPathFromWebId(webId, appPath);
    const folderExist = await resourceExists(url);
    if (!folderExist) {
      await createDoc(data, {
        method: "PUT",
        headers: {
          "Content-Type": "text/turtle"
        }
      });
    }
    return url;
  }

  return `${podStoragePathValue}${appPath}`;
};

/**
 *  Check and create the initial app files and folders
 * @param folderPath
 * @returns {Promise<boolean>} Returns whether or not there were any errors during the creation process
 */
export const createInitialFiles = async webId => {
  try {
    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );

    // If we do not have Write permission, there's nothing we can do here
    if (!hasWritePermission) return;

    // Get the default app storage location from the user's pod and append our path to it
    const path = await storageHelper.getAppStorage(webId);

    // Set up various paths relative to the app URL
    const settingsFilePath = `${path}settings.ttl`;
    const groupsPath = `${path}groups/`;
    const sharedPath = `${path}shared/`;
    let inboxPath = `${path}inbox/`;

    // Check if the tictactoe folder exists, if not then create it. This is where game files, the game inbox, and settings files are created by default
    const gameFolderExists = await resourceExists(path);
    if (!gameFolderExists) {
      await createDoc(data, {
        method: "PUT",
        headers: {
          "Content-Type": "text/turtle"
        }
      });
    }

    const inboxExists = await resourceExists(inboxPath);
    if (!inboxExists) {
      await fc.createFolder(inboxPath, { createPath: true }).then(async ()=>{
        const settingsFileExists = await resourceExists(settingsFilePath);
        if (!settingsFileExists) {
          await createDocument(settingsFilePath).then(()=>{
             permissionHelper.checkOrSetSettingsReadPermissions(
              settingsFilePath,
              webId
            );
            
            data[settingsFilePath].inbox.set(namedNode(inboxPath));
          });
        }
      });
    }
    const groupsFolderExists = await resourceExists(groupsPath);
    if(!groupsFolderExists){
      await fc.createFolder(groupsPath, {createPath:true});
    }

    const sharedFolderExists = await resourceExists(sharedPath);
    if(!sharedFolderExists){
      await fc.createFolder(sharedPath, {createPath:true});
    }
    // Check if the settings file exists, if not then create it. This file is for general settings including the link to the game-specific inbox
    const settingsFileExists = await resourceExists(settingsFilePath);
    if (!settingsFileExists) {
      await createDocument(settingsFilePath).then(()=>{
         permissionHelper.checkOrSetSettingsReadPermissions(
          settingsFilePath,
          webId
        );
        
        data[settingsFilePath].inbox.set(namedNode(inboxPath));
      });
    }
    
       // Check for CONTROL permissions to see if we can set permissions or not
       const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
        webId,
        AccessControlList.MODES.CONTROL
      );

      if (hasControlPermissions) {
        await permissionHelper.checkOrSetSettingsReadPermissions(
          settingsFilePath,
          webId
        );
      }


    return true;
  } catch (error) {
    errorToaster(error.message, "Error");
    return false;
  }
};

export const checkAndInitializeInbox = async () => "";
