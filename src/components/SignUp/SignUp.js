import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignUpSuccess from '../ui/modal/SignUpSuccess';
import {addUser} from '../../api/UserApi';
import './signup.css';


const SignUp = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onSave = (user) => {
        //alert(JSON.stringify(user, null, 4));
        addUser(user);
        handleShow();
    }
    return (
        <div className="outer-container">
            <div className="signup-container">
                <SignUpForm onSave={onSave} />
                <SignUpSuccess handleClose={handleClose} show={show} />
            </div>
        </div>
    )
}

export default SignUp;