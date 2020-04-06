import React, { useCallback, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useDropzone} from 'react-dropzone'



const LateralForm = props  => {
    const { t } = useTranslation();
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader()
    
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
          // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log(binaryStr)
          }
          reader.readAsArrayBuffer(file)
        })
        
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
            accept: "image/*",
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
            <Tabs id="controlled-tab-example">
                <Tab eventKey="first" title={t('createRouteView.create.tabTitle')}>
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre de la ruta</Form.Label>

                            <Form.Control
                                required
                                type="text"
                                placeholder="nombre"
                                defaultValue={props.name}
                                onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                                    props.setName(x.currentTarget.value);
                                } }
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formSurname">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows="3"
                                defaultValue={props.description}
                                onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                                    props.setDescription(x.currentTarget.value);
                                } }                    />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Crear
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="second" title={t('createRouteView.import.tabTitle')}>
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <p>Supported files types are: *.gpx</p>
                    </div>
                </Tab>
            </Tabs>
        );  
  };
  export default LateralForm;