import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {vinculateResourceIdToRouteFile } from "../../../../../../services/uploadResources/resourcesService"
import {successToaster, errorToaster} from "../../../../../../utils/toaster"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormWrapper } from "./vinculationForm.style";

const VinculationForm = props => {
    const {routeObject} = props;
    const [resourceId, setResourceId]= useState("");
    const { t } = useTranslation();


    function vinculate(){
        vinculateResourceIdToRouteFile(routeObject, resourceId, function(success) {
            if(success){
                successToaster(t('resourceVinculation.success'));
                }
                else{
                errorToaster(t('resourceVinculation.failure'));
                }
        });   
    }

    return (
        <FormWrapper>
            <Form onSubmit={vinculate}>
                <Form.Group controlId="formName">
                    <Form.Label className="label"> {t('resourceVinculation.label')}</Form.Label>
                    <Form.Control
                        className="input"
                        required
                        type="text"
                        placeholder={t('https://luispresacollada.solid.community/viade/resources/holi.jpg')}
                        onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => { 
                            setResourceId(x.currentTarget.value);
                        } }
                    />
                </Form.Group>
                <Button variant="primary" type="submit"> {t('resourceVinculation.button')} </Button>
            </Form>
        </FormWrapper>

    )
}




export default VinculationForm;