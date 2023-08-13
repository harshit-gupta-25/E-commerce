import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import AuthContext from '../../store/auth-context';
import ReactRouterPrompt from 'react-router-prompt';
import LeavingDirty from '../ui/modal/onLeavingDirty';
import DeleteSuccess from '../ui/modal/DeleteSuccess';
import { deleteUser } from '../../api/UserApi';


const DeleteProfile = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [check, setCheck] = useState(false);

    const auth = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Required')
    })
    return (
        <div className="p-3 ps-5">
            <Formik
                initialValues={{
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    var pass = values.password;
                    //alert(JSON.stringify(pass));
                    if (auth.userData.password === pass) {
                        deleteUser(auth.userId);
                        setCheck(false);
                        handleShow();
                        setTimeout(() => {
                            auth.logout();
                        }, 2000);
                    } else {
                        setCheck(true);
                    }
                }}>
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur, dirty }) => (
                    <>
                        <ul className="text-muted mb-3 ps-3">
                            <li>If you delete your account, you will lose your all data.</li>
                        </ul>
                        <Form className="w-50" onSubmit={handleSubmit}>
                            <Form.Group className="form-container" controlId="password">
                                <Form.Label>Enter Password</Form.Label>
                                <Form.Control className={(touched.password && errors.password) ? "form-error-block" : "form-input"} type="password" name="password" placeholder="Enter password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            </Form.Group>
                            {touched.password && errors.password ? <div className="form-error">{errors.password}</div> : <div className="form-error-none" />}{check && <div>Invalid Password</div>}
                            <div className="d-flex mt-5 justify-content-center">
                                <Button className="fw-bold w-50 form-button" type="submit" variant="danger">Delete my account</Button>
                            </div>
                        </Form>
                        <ReactRouterPrompt when={dirty}>
                            {({ isActive, onConfirm, onCancel }) => (
                                <LeavingDirty show={isActive} handleClose={onCancel} handleConfirm={onConfirm} />
                            )}
                        </ReactRouterPrompt>
                    </>
                )}
            </Formik>
            <DeleteSuccess show={show} handleClose={handleClose} text="Account" />
        </div>
    )
}

export default DeleteProfile;