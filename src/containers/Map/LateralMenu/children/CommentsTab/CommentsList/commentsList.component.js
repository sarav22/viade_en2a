import React, { Component } from 'react';
import Media from 'react-bootstrap/Media';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

class CommentsList extends Component<Props> {

    constructor(props){
        super(props)

        //const { comments } = props;
        const {commentsList} = props;
        const comments = [];
    }
    

    render() {
    return (
        <Modal.Dialog scrollable centered style={{ "max-width": "100%" }}>
            <Modal.Body style={{ 'max-height': 'calc(100vh - 220px)', 'overflow-y': 'auto', 'width': '100%',"scrollbar-width":"thin"}}>
                <Container>
                    {this.props.comments.map((comment) => {
                        console.log(comment)
                        return (
                            <Media>
                                <Media.Body>
                                    <h1> {comment.dateCreated} </h1>
                                    <p> {comment.text} </p>
                                </Media.Body>
                            </Media>
                        );
                    })}
                </Container>
            </Modal.Body>
        </Modal.Dialog>

    );

    }

}
export default CommentsList;