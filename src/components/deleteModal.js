import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteConfirmation = ({deleteComment, show, handleClose, postOrComment}) => {
    return(
        <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete {postOrComment}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this {postOrComment}?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{width: '20%'}}>
                        No
                    </Button>
                    <Button variant="danger" onClick={deleteComment} style={{width: '20%'}}>
                        Yes
                    </Button>
                    </Modal.Footer>
        </Modal>
    )
};

export default DeleteConfirmation;