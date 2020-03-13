import React from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';

class RouteButton extends React.Component<Props> {

    constructor(props){
        super(props);
            this.state={
                toRoute: false
            }
    }

    handleClick = () => {
        this.setState(() => ({
            toRoute: true
        }))
    }

    render(){
        const { route } = this.props;

        if(this.state.toRoute === true){
            return <Redirect to="/map" />
        }
        
        return (
            
            <Button onClick={this.handleClick}>

            </Button>
    
        );
    }
}

export default RouteButton;