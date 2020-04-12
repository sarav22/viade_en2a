import React, { useCallback, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import {useDropzone} from 'react-dropzone';
import {parseGpxToRoutes} from '../../../services/importing/gpx/gpxParser.js';
import {saveRouteToPOD} from '../../../services/DomainJSONTranslator.js';
 
const LateralMenu = props  => {
    const { t } = useTranslation();
    const onDrop = useCallback((acceptedFiles) => {
      if(acceptedFiles.length != 1) {
        alert(t('error.sizeLimitImport'));
      } else {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader()
   
          reader.onabort = () => alert(t('error.fileReadError'))
          reader.onerror = () => alert(t('error.fileReadError'))
          reader.onload = () => {
            const routeString = reader.result;
            try {
              var importResult = true;
                parseGpxToRoutes(routeString, function(routeArray) {
                  routeArray.forEach(route => {
                    saveRouteToPOD(route, function(result) {
                      importResult = importResult && result;
                    });
                  });
                  if(importResult && routeArray.length > 0) {
                    alert(t('import.success'));
                  } else {
                    alert(t('import.failure'));
                  }
                  if(routeArray.length > 0) {
                    props.setRoute(routeArray);
                  } else {
                    alert(t('error.gpxNotRoutes'));
                  }
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
            <div data-testid="dropMenu" {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>{t('import.dragAndDropMain')}</p>
                <p>{t('import.dragAndDropSupported')}</p>
            </div>
        );  
  };
  export default LateralMenu;