import React from 'react';
import { Formik } from 'formik';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import ReactRouterPrompt from 'react-router-prompt';
import LeavingDirty from '../ui/modal/onLeavingDirty';

const SignUpForm = (props) => {

    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    const validationSchema = Yup.object().shape({
        fname: Yup.string()
            .matches(/^[aA-zZ\s]+$/, 'Invalid first name')
            .min(2, 'Too Short')
            .max(50, 'Too Long')
            .required('Required'),
        lname: Yup.string()
            .matches(/^[aA-zZ\s]+$/, 'Invalid last name')
            .min(2, 'Too Short')
            .max(50, 'Too Long')
            .required('Required'),
        phone: Yup.string()
            .matches(phoneRegExp, "Invalid phone number")
            .length(10, 'Invalid Phone Number')
            .required('Required'),
        email: Yup.string()
            .email('Enter valid email address')
            .max(100, 'Email must be less than 100 characters')
            .required('Required'),
        password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .max(20, 'Password must be less than 20 characters')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], 'Password not match')
            .required('Required')
    })


    return (
        <Formik
            initialValues={{
                fname: '',
                lname: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                var user = {};
                user.fname = values.fname;
                user.lname = values.lname;
                user.phone = values.phone;
                user.email = values.email;
                user.password = values.password;
                //alert(JSON.stringify(user,null,5));
                props.onSave(user);
                resetForm();
                setSubmitting(false);
            }}>
            {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, dirty }) => (
                <>
                    <Form onSubmit={handleSubmit}>
                        <span className="form-title">Sign up</span>
                        <Row className="m-0 justify-content-between">
                            <Form.Group as={Col} className="form-container p-0 form-row" controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control className={(touched.fname && errors.fname) ? "form-error-block" : "form-input"} type="text" name="fname" value={values.fname} placeholder="Enter first name" onChange={handleChange} onBlur={handleBlur} />
                            </Form.Group>
                            <Form.Group as={Col} className="form-container p-0 form-row" controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control className={(touched.lname && errors.lname) ? "form-error-block" : "form-input"} type="text" name="lname" value={values.lname} placeholder="Enter last name" onChange={handleChange} onBlur={handleBlur} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>{touched.fname && errors.fname ? <div className="form-error">{errors.fname}</div> : <div className="form-error-none" />}</Col>
                            <Col>{touched.lname && errors.lname ? <div className="form-error">{errors.lname}</div> : <div className="form-error-none" />}</Col>
                        </Row>
                        <Form.Group className="form-container" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control className={(touched.phone && errors.phone) ? "form-error-block" : "form-input"} type="text" name="phone" value={values.phone} placeholder="Enter phone number" onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        {touched.phone && errors.phone ? <div className="form-error">{errors.phone}</div> : <div className="form-error-none" />}
                        <Form.Group className="form-container" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={touched.email && errors.email ? "form-error-block" : "form-input"} type="email" name="email" value={values.email} placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        {touched.email && errors.email ? <div className="form-error">{errors.email}</div> : <div className="form-error-none" />}
                        <Form.Group className="form-container" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={touched.password && errors.password ? "form-error-block" : "form-input"} type="password" name="password" value={values.password} placeholder="Enter password" onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        {touched.password && errors.password ? <div className="form-error">{errors.password}</div> : <div className="form-error-none" />}
                        <Form.Group className="form-container" controlId="confirmPassword">
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control className={touched.confirmPassword && errors.confirmPassword ? "form-error-block" : "form-input"} type="password" name="confirmPassword" value={values.confirmPassword} placeholder="Re-enter password" onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        {touched.confirmPassword && errors.confirmPassword ? <div className="form-error">{errors.confirmPassword}</div> : <div className="form-error-none" />}
                        <div className="d-flex mt-5 justify-content-center">
                            <Button className="fw-bold w-50 form-button" type="submit" variant="success" disabled={isSubmitting}>Signup</Button>
                        </div>
                        <div className="signup-footer">
                            Already have an account?<Link to="/login">Sign in</Link>
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
    )
}

export default SignUpForm;