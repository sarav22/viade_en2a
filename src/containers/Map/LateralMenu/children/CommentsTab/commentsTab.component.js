import React from 'react';
import Media from 'react-bootstrap/Media';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

const CommentsTab = props => {
    const { comments } = props;

    return (
        <Modal.Dialog scrollable centered style={{ "max-width": "100%" }}>
            <Modal.Body style={{ 'max-height': 'calc(100vh - 215px)', 'overflow-y': 'auto', 'width': '100%',"scrollbar-width":"thin"}}>
                <Container>
                    {comments.map((comment) => {
                        return (
                            <Media>
                                <Media.Body>
                                    <p>{comment.resourceUrl}</p>
                                </Media.Body>
                            </Media>
                        );
                    })}
                </Container>
            </Modal.Body>
        </Modal.Dialog>

    );

};

export default CommentsTab;