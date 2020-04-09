import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import {Route} from '../../../../../domain/domainClasses'



import {postNewComment} from "../../../../../services/comments/commentsService"
import CommentsList from "./CommentsList/commentsList.component"
import CommentForm from "./CommentsForm/index"
class CommentsTab extends Component<Props>{

    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
        console.log("Comments Tab props")
        console.log(this.props)

        this.handleSetText = this.handleSetText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSetText(newText) {
        this.setState({ text: newText });
    }

   
    handleSubmit(event) {
        const { routeObject } = this.props;
        
        postNewComment(this.state.text, routeObject.comments, function(success) {
            if(success){
                alert("Comment saved");
            }
            else{
                alert("There was an error");
            }
        })
        
        console.log(this.state.text)
        event.preventDefault();
    }

    render() {
        const { routeObject } = this.props;
        return (
            <Container fluid>
            
                        <CommentForm
                            setText={this.handleSetText} 
                            handleSubmit={this.handleSubmit}
                         />


                        <CommentsList
                            comments = {routeObject.commentList}
                        />
              
            </Container>
        );
    }
}

export default CommentsTab;