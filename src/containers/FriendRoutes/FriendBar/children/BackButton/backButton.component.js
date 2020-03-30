import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';

const BackButton = props => {
    const { t } = useTranslation();

    async function goBack(event){
        event.preventDefault();
        browserHistory.push("/#/manageFriends");
        await reload();
    }

    const reload = () => {
        window.location.reload(true);
    }

    return (
        <Button variant="light" onClick={(event) => goBack(event)} data-testid="friend-backButton">{t("utils.back")}</Button>
    );
}

export default BackButton;