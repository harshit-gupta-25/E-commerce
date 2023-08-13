import React from 'react';
import Rating from '@mui/material/Rating';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ReactRouterPrompt from 'react-router-prompt';
import LeavingDirty from '../ui/modal/onLeavingDirty';

const ProductForm = (props) => {
    return (
        <>
            <Form onSubmit={props.handleSubmit}>
                <Form.Group className="form-container" controlId="title">
                    <Form.Label>Product Title</Form.Label>
                    <Form.Control className={(props.touched.title && props.errors.title) ? "form-error-block" : "form-input"} name="title" type="text" placeholder="Enter product title" value={props.values.title} onChange={props.handleChange} onBlur={props.handleBlur} />
                </Form.Group>
                {props.touched.title && props.errors.title ? <div className="form-error">{props.errors.title}</div> : <div className="form-error-none" />}
                <Row className="m-0 justify-content-between">
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="brand">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control className={(props.touched.brand && props.errors.brand) ? "form-error-block" : "form-input"} name="brand" type="text" placeholder="Enter product brand" value={props.values.brand} onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Form.Group>
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="category">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control className={(props.touched.category && props.errors.category) ? "form-error-block" : "form-input"} name="category" type="text" placeholder="Enter product category" value={props.values.category} onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>{props.touched.brand && props.errors.brand ? <div className="form-error">{props.errors.brand}</div> : <div className="form-error-none" />}</Col>
                    <Col>{props.touched.category && props.errors.category ? <div className="form-error">{props.errors.category}</div> : <div className="form-error-none" />}</Col>
                </Row>
                <Row className="m-0 justify-content-between">
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="price">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control className={(props.touched.price && props.errors.price) ? "form-error-block" : "form-input"} name="price" type="text" placeholder="Enter product price" value={props.values.price} onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Form.Group>
                    <Form.Group as={Col} className="form-container p-0 form-row" controlId="stock">
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control className={(props.touched.stock && props.errors.stock) ? "form-error-block" : "form-input"} name="stock" type="text" placeholder="Enter product quantity" value={props.values.stock} onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>{props.touched.price && props.errors.price ? <div className="form-error">{props.errors.price}</div> : <div className="form-error-none" />}</Col>
                    <Col>{props.touched.stock && props.errors.stock ? <div className="form-error">{props.errors.stock}</div> : <div className="form-error-none" />}</Col>
                </Row>
                <Form.Group as={Row} controlId="rating">
                    <Form.Label column md={3}>Product Rating:</Form.Label>
                    <Col>
                        <Rating name="rating" size="large" value={+props.values.rating} onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Col>
                </Form.Group>
                {props.touched.rating && props.errors.rating ? <div className="form-error">{props.errors.rating}</div> : <div className="form-error-none" />}
                <Form.Group controlId="description">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" placeholder="Enter product description" value={props.values.description} onChange={props.handleChange} onBlur={props.handleBlur} />
                </Form.Group>
                <div className="d-flex mt-5 justify-content-center">
                    <Button className="fw-bold w-50 form-button" type="submit" variant="primary" disabled={props.isSubmitting}>Save Changes</Button>
                </div>
            </Form>
            <ReactRouterPrompt when={props.dirty}>
                {({ isActive, onConfirm, onCancel }) => (
                    <LeavingDirty show={isActive} handleClose={onCancel} handleConfirm={onConfirm} />
                )}
            </ReactRouterPrompt>
        </>
    )
}

export default ProductForm