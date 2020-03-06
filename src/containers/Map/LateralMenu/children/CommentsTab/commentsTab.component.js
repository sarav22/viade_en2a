import React from 'react';
import Media from 'react-bootstrap/Media';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

const CommentsTab = props => {
    const { comments } = props;

    return (
        <Modal.Dialog scrollable centered style={{ "max-width": "100%" }}>
            <Modal.Body style={{ 'max-height': 'calc(100vh - 215px)', 'overflow-y': 'auto', 'width': '100%' }}>
                <Container>
                    {comments.map((comment) => {
                        return (
                            <Media>
                                <img
                                    width={64}
                                    height={64}
                                    className="mr-3"
                                    src={"https://picsum.photos/id/" + Math.floor(Math.random() * 50) + "/64/64"}
                                    alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h5>{comment.author + " " + comment.time}</h5>
                                    <p>{comment.text}</p>
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