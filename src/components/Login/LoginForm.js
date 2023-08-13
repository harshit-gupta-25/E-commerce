import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';

const LoginForm = (props) => {

    const [check, setCheck] = useState(false);


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Enter valid email address')
            .max(100, 'Email must be less than 100 characters')
            .required('Required'),
        password: Yup.string()
            .required('Required')
    })


    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                var login = {};
                login.email = values.email;
                login.password = values.password;
                //alert(JSON.stringify(login, null, 2));
                if (!props.onlogin(login)) {
                    setTimeout(() => {
                        setCheck(true);
                    }, 2000);
                }
                setSubmitting(false);
            }}>
            {({ values, touched, errors, handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <span className="form-title">Login</span>
                    {check ? <div className="form-error text-center d-block fw-bold">Invalid credentials.Try again</div> : <div className="form-error-none" />}
                    <Form.Group className="form-container" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className={(touched.email && errors.email) ? "form-error-block" : "form-input"} type="text" name="email" value={values.email} placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    {touched.email && errors.email ? <div className="form-error">{errors.email}</div> : <div className="form-error-none" />}
                    <Form.Group className="form-container" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className={(touched.password && errors.password) ? "form-error-block" : "form-input"} type="password" name="password" value={values.password} placeholder="Enter password" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    {touched.password && errors.password ? <div className="form-error">{errors.password}</div> : <div className="form-error-none" />}
                    <div className="d-flex mt-5 justify-content-center">
                        <Button className="fw-bold w-50 form-button" type="submit" disabled={isSubmitting}>LOGIN</Button></div>
                    <div className="login-footer">
                        Don't have an account?<Link to="/signup">Sign Up</Link>
                    </div>
                </Form>
            )}
        </Formik >
    )
}

export default LoginForm;