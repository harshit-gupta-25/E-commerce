import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import AuthContext from '../../store/auth-context';
import ReactRouterPrompt from 'react-router-prompt';
import LeavingDirty from '../ui/modal/onLeavingDirty';
import EditSuccess from '../ui/modal/EditSuccess';
import { updatePassword } from '../../api/UserApi';

const ChangePassForm = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [check, setCheck] = useState(false);

  const auth = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    oldPass: Yup.string()
      .required('Required'),
    newPass: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .max(20, 'Password must be less than 20 characters')
      .required('Required'),
    confirmPass: Yup.string()
      .required('Required')
      .oneOf([Yup.ref("newPass")], 'Password not match'),
  })
  return (
    <div className="p-3 ps-5">
      <Formik
        initialValues={{
          oldPass: '',
          newPass: '',
          confirmPass: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          var newPass = {};
          newPass.password = values.newPass;
          //alert(JSON.stringify(pass, null, 1));
          if (auth.userData.password === values.oldPass) {
            updatePassword(auth.userId, newPass);
            handleShow();
            setCheck(false);
            resetForm();
          } else {
            setCheck(true);
          }
          setSubmitting(false);
        }}>
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, dirty }) => (
          <>
            <Form className="w-50" onSubmit={handleSubmit}>
              <Form.Group className="form-container" controlId="oldPass">
                <Form.Label>Current password</Form.Label>
                <Form.Control className={(touched.oldPass && errors.oldPass) ? "form-error-block" : "form-input"} type="password" name="oldPass" value={values.oldPass} placeholder="Enter current password" onChange={handleChange} onBlur={handleBlur} />
              </Form.Group>
              {touched.oldPass && errors.oldPass ? <div className="form-error">{errors.oldPass}</div> : <div className="form-error-none" />}{check && <div>Incorrect Password.</div>}
              <Form.Group className="form-container" controlId="newPass">
                <Form.Label>Enter new password</Form.Label>
                <Form.Control className={(touched.newPass && errors.newPass) ? "form-error-block" : "form-input"} type="password" name="newPass" value={values.newPass} placeholder="Enter new password" onChange={handleChange} onBlur={handleBlur} />
              </Form.Group>
              {touched.newPass && errors.newPass ? <div className="form-error">{errors.newPass}</div> : <div className="form-error-none" />}
              <Form.Group className="form-container" controlId="confirmPass">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control className={(touched.confirmPass && errors.confirmPass) ? "form-error-block" : "form-input"} type="password" name="confirmPass" value={values.confirmPass} placeholder="Re-enter new password" onChange={handleChange} onBlur={handleBlur} />
              </Form.Group>
              {touched.confirmPass && errors.confirmPass ? <div className="form-error">{errors.confirmPass}</div> : <div className="form-error-none" />}
              <div className="d-flex mt-5 justify-content-center">
                <Button className="fw-bold w-50 form-button" type="submit" disabled={isSubmitting}>Change Password</Button>
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
      <EditSuccess show={show} handleClose={handleClose} text="Password" />
    </div>
  )
}

export default ChangePassForm;