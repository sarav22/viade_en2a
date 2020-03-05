import React from 'react';
import Media from 'react-bootstrap/Media';


const CommentsTab = props => {
    const { webId, comments } = props;

    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Media>
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={"https://picsum.photos/id/"+Math.floor(Math.random() * 50)+"/64/64"}
                            alt="Generic placeholder"
                        />
                        <Media.Body>
                            <h5>{comment.author + " " + comment.time}</h5>
                            <p>{comment.text}</p>
                        </Media.Body>
                    </Media>
                );
            }
            )}

        </div>
    );

};

export default CommentsTab;