import React, { useCallback, useMemo } from "react";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {useDropzone} from 'react-dropzone';
import parseGpxToRoutes from '../../../services/importing/gpx/gpxParser.js';
import {saveRouteToPOD} from '../../../services/DomainJSONTranslator.js';
 
const LateralMenu = props  => {
    const { t } = useTranslation();
    const onDrop = useCallback((acceptedFiles) => {
      if(acceptedFiles.length != 1) {
        alert(t('error.sizeLimitImport'));
      } else {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader()
   
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            const routeString = reader.result;
            console.log(routeString);
            try {
                parseGpxToRoutes(routeString, function(route) {

                    this.props.viewRoute(route);
                    saveRouteToPOD(route);
                });
            } catch(error) {
              alert(t('error.importError'));
            }
          }
          reader.readAsText(file)

        });
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
            accept: ".gpx",
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
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>{t('import.dragAndDropMain')}</p>
                <p>{t('import.dragAndDropSupported')}</p>
            </div>
        );  
  };
  export default LateralMenu;