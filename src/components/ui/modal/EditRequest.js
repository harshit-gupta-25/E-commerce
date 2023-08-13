import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';


const EditRequest = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to edit/update the selected {props.text}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                <Button variant="warning" onClick={props.editButtonHandler}>Edit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditRequest;