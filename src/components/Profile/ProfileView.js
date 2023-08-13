import React, { useState, useEffect, useContext } from 'react';
import { Formik } from 'formik';
import { Form, Row, Col, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import AuthContext from '../../store/auth-context';
import { getUserByID, updateUser } from '../../api/UserApi';
import ReactRouterPrompt from 'react-router-prompt';
import LeavingDirty from '../ui/modal/onLeavingDirty';
import EditRequest from '../ui/modal/EditRequest';
import EditSuccess from '../ui/modal/EditSuccess';
import { BsPencilSquare } from 'react-icons/bs';
import user from '../../assets/user.png';

const ProfileView = () => {

  const auth = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => setConfirm(true)
  const handleClose = () => { setShow(false); setConfirm(false); }

  useEffect(() => {
    let mounted = true;
    getUserByID(auth.userId)
      .then(user => {
        if (mounted) {
          setData(user);
        }
      })
    return () => mounted = false;
  }, [auth.userId])

  const editButtonHandler = () => {
    handleClose();
    setEdit(true);
  }

  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Invalid first name')
      .min(4, 'Too Short')
      .max(20, 'Too Long')
      .required('Required'),
    lname: Yup.string()
      .min(4, 'Too Short')
      .max(20, 'Too Long')
      .matches(/^[aA-zZ\s]+$/, 'Invalid last name')
      .required('Required'),
    phone: Yup.string()
      .matches(phoneRegExp, "Invalid phone number")
      .length(10, 'Invalid Phone Number')
      .required('Required'),
    city: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Invalid City name'),
    state: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Invalid State name'),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Invalid Code'),
    country: Yup.string()
      .matches(/^[aA-zZ\s]+$/, 'Invalid Country name'),
  })

  return (
    <div className="row justify-content-center bg-white">
      <div className="col-12 text-end">
        <Button type="button" variant="warning" onClick={handleShow} disabled={edit}><BsPencilSquare className="me-2 mb-1" />Edit Profile</Button>
      </div>
      <div className="col-12 profile-form-container">
        <Formik
          initialValues={{
            fname: data.fname || "",
            lname: data.lname || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            pincode: data.pincode || "",
            country: data.country || ""
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            var user = {};
            user.fname = values.fname;
            user.lname = values.lname;
            user.phone = values.phone;
            user.email = values.email;
            user.address = values.address;
            user.city = values.city;
            user.state = values.state;
            user.pincode = values.pincode;
            user.country = values.country;
            //alert(JSON.stringify(user, null, 10));
            if (updateUser(auth.userId, user)) {
              setEdit(false);
              handleConfirm();
              resetForm({ values: values });
            }
            setSubmitting(false);
          }}>
          {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, dirty }) => (
            <>
              <Form onSubmit={handleSubmit}>
                <span className="d-flex justify-content-center pb-30"><img className="rounded-circle" src={user} alt="" width="150" height="150" /></span>
                <fieldset disabled={!edit}>
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
                  <Form.Group className="form-container" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className="form-input" type="email" name="email" value={values.email} placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} disabled />
                  </Form.Group>
                  {<div className="form-error-none" />}
                  <Form.Group className="form-container" controlId="phone">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control className={(touched.phone && errors.phone) ? "form-error-block" : "form-input"} type="text" name="phone" value={values.phone} placeholder="Enter contact number" onChange={handleChange} onBlur={handleBlur} />
                  </Form.Group>
                  {touched.phone && errors.phone ? <div className="form-error">{errors.phone}</div> : <div className="form-error-none" />}
                  <Form.Group className="form-container" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control className="form-input" type="text" name="address" value={values.address} placeholder="Enter Address" onChange={handleChange} onBlur={handleBlur} />
                  </Form.Group>
                  {<div className="form-error-none" />}
                  <Row className="m-0 justify-content-between">
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control className={(touched.city && errors.city) ? "form-error-block" : "form-input"} type="text" name="city" value={values.city} placeholder="City" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control className={(touched.state && errors.state) ? "form-error-block" : "form-input"} type="text" name="state" value={values.state} placeholder="State" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>{touched.city && errors.city ? <div className="form-error">{errors.city}</div> : <div className="form-error-none" />}</Col>
                    <Col>{touched.state && errors.state ? <div className="form-error">{errors.state}</div> : <div className="form-error-none" />}</Col>
                  </Row>
                  <Row className="m-0 justify-content-between">
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="pincode">
                      <Form.Label>Pin Code</Form.Label>
                      <Form.Control className={(touched.pincode && errors.pincode) ? "form-error-block" : "form-input"} type="text" name="pincode" value={values.pincode} placeholder="Pin Code" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control className={(touched.country && errors.country) ? "form-error-block" : "form-input"} type="text" name="country" value={values.country} placeholder="Country" onChange={handleChange} onBlur={handleBlur} />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>{touched.pincode && errors.pincode ? <div className="form-error">{errors.pincode}</div> : <div className="form-error-none" />}</Col>
                    <Col>{touched.country && errors.country ? <div className="form-error">{errors.country}</div> : <div className="form-error-none" />}</Col>
                  </Row>
                  {(edit) ? (
                    <div className="d-flex mt-5 justify-content-center">
                      <Button className="fw-bold w-50 form-button" type="submit" disabled={isSubmitting}>Save Changes</Button>
                    </div>) : null}
                </fieldset>
              </Form>
              <ReactRouterPrompt when={dirty}>
                {({ isActive, onConfirm, onCancel }) => (
                  <LeavingDirty show={isActive} handleClose={onCancel} handleConfirm={onConfirm} />
                )}
              </ReactRouterPrompt>
            </>
          )}
        </Formik>
      </div>
      <EditRequest show={show} handleClose={handleClose} text="profile details" editButtonHandler={editButtonHandler} />
      <EditSuccess show={confirm} handleClose={handleClose} text="Profile" />
    </div>
  )
}

export default ProfileView;