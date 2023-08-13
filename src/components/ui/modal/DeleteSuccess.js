import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';


const DeleteSuccess = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Deleted</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.text} deleted successfully.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>Okay</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteSuccess;