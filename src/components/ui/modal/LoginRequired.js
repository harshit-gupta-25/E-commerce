import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';


const LoginRequired = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>Login required to continue.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Not Now</Button>
                <Link to="/login"><Button variant="primary">Login</Button></Link>
            </Modal.Footer>
        </Modal>
    )
}

export default LoginRequired;