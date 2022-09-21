import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const EditComment = ({ show, handleClose, comment, postId}) => {

    const [ usernameField, setUsernameField ] = useState(comment.username);
    const [ commentField, setCommentField ] = useState(comment.comment);

    const {user} = useContext(AuthContext);

    const handleUsername = (e) => {
        setUsernameField(e.target.value);
    };
    const handleComment = (e) => {
        setCommentField(e.target.value);
    };

    useEffect(() => {
        setUsernameField(comment.username);
        setCommentField(comment.comment);
    }, [comment.username, comment.comment])

    //send PUT request to api
    const editCommentReq = (e) => {
        e.preventDefault();
        handleClose();
        fetch(`https://powerful-sands-70177.herokuapp.com/api/posts/${postId}/comments/${comment._id}`, {
            mode: 'cors', method: 'PUT', headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token },
            body: JSON.stringify({
                username: usernameField,
                comment: commentField
            })
        })
            .then(res => res.json())
            .then(data => console.log(`Comment edited, ${data}`))
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };
    
    return(
        <Modal show={show} onHide={handleClose} aria-labelledby = "contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id = "contained-modal-title-vcenter">
                    Edit Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={editCommentReq}>
                    <div class="mb-3">
                        <label class="form-label" for = "username">Username: </label>
                        <input required='true' onChange={handleUsername} value={usernameField} id = "username" name = "username" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for = "comment">Comment: </label>
                        <input required='true' onChange={handleComment} value={commentField} id = "comment" name = "comment" class="form-control"/>
                    </div>
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{width: '20%'}}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" style={{width: '30%'}}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    )
};

export default EditComment;