import React from 'react';
import Button from 'react-bootstrap/Button';
import {browserHistory} from 'react-router';

export const RouteButton = props => {
    const { route } = props;

    async function handleClick(event) {
        event.preventDefault();
        browserHistory.push("/map/" + route);
        await reload();
    }

    const reload = () => {
        window.location.reload(true);
    }
   
    return (
        
        <Button onClick={(event) => handleClick(event)}>

        </Button>

    );
}

export default RouteButton;