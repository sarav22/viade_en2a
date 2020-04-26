import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import {useDropzone} from 'react-dropzone';
import { setJestCucumberConfiguration } from "jest-cucumber";
import {uploadResourceToRoute } from "../../../../../../services/uploadResources/resourcesService"
import {successToaster, errorToaster} from "../../../../../../utils/toaster"
 
const LateralMenu = props  => {
  const {routeObject} = props;
  const [files, setFiles]= useState([]);
    const { t } = useTranslation();

    function uploadFiles(){
      files.forEach(file => {
        uploadResourceToRoute(file, routeObject, function(success){
            if(success){
              successToaster(t('resourceUpload.success'))
            }
            else{
              errorToaster(t('resourceUpload.failure'))
            }
        })
      })
      
    }
    const onDrop = useCallback((acceptedFiles) => {
      if(acceptedFiles.length !== 1) {
        errorToaster(t('error.sizeLimitImport'));
      } else {
        setFiles(currentFile => acceptedFiles)
        
      }
      }, []);
      const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
      };
     
      const activeStyle = {
        borderColor: '#2196f3'
      };
     
      const acceptStyle = {
        borderColor: '#00e676'
      };
     
      const rejectStyle = {
        borderColor: '#ff1744'
      };
      const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject} = useDropzone({
            accept: [".jpg", ".mp4", ".jpeg", ".png", ".mp3", ".gif"],
            maxFiles: 1,
            onDrop});
           
        const style = useMemo(() => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
          }), [
            isDragActive,
            isDragReject
          ]);
        return (
          <div>
            <div data-testid="dropMenu" {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>{t('resourceUpload.dragAndDropMain')}</p>
                <p>{t('resourceUpload.dragAndDropSupported')}</p>
            </div>
            <button onClick = {() => uploadFiles()}>{t('resourceUpload.button')} </button>
            </div>
        );  
  };
  export default LateralMenu;