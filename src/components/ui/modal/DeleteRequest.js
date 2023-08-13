import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';

const DeleteRequest = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the selected product?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                <Button variant="danger" onClick={props.deleteProduct}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteRequest;