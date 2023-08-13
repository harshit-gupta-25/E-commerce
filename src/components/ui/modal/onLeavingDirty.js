import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';

const onLeavingDirty = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Leave Page?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Changes you made will be lost.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                <Button variant="primary" onClick={props.handleConfirm}>Leave</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default onLeavingDirty;