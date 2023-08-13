import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';

const SignUpSuccess = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Account Created</Modal.Title>
            </Modal.Header>
            <Modal.Body>Account created successfully.Login to continue.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Not Now</Button>
                <Link to="/login"><Button variant="primary">Login</Button></Link>
            </Modal.Footer>
        </Modal>
    )
}

export default SignUpSuccess;