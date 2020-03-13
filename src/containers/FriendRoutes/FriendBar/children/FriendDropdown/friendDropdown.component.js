import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ldflex from "@solid/query-ldflex";
import { useTranslation } from 'react-i18next';
import {browserHistory} from 'react-router';

const FriendDropdown = props => {

    const { webId, friendWebId } = props;
    const { t } = useTranslation();

    async function deleteFriend(event) {
        event.preventDefault();
        alert("Amigo eliminado");
        return ldflex[webId].knows.delete(ldflex[friendWebId]);
    }

    function goToMap(){
        browserHistory.push("/map");
    }
    
    return (
        
        <DropdownButton variant="light" id="dropdown-basic-button" title="" data-testid="friend-dropdown">
            <Dropdown.Item target="_blank" href={friendWebId}>{t("friendsManagement.profile")}</Dropdown.Item>
            <Dropdown.Item onClick={deleteFriend}>{t("friendsManagement.delete")}</Dropdown.Item>
            <Dropdown.Item onClick={goToMap}>Ir al mapa</Dropdown.Item>
        </DropdownButton>
  
    );
  
};

export default FriendDropdown;