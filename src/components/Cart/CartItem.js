import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseItem, decreaseItem } from '../../reducer/cartSlice';
import image from '../../assets/default-product-image.png';

const CartItem = (props) => {

    const dispatch = useDispatch();

    const decrementHandler = () => { props.quantity === 1 ? dispatch(removeFromCart(props.id)) : dispatch(decreaseItem(props.id)) }

    const incrementHandler = () => { dispatch(increaseItem(props.id)) }

    return (
        <Card style={{ 'will-change': 'unset' }}>
            <Card.Body className="row card-rowItem">
                <div className="col-md-2">
                    <Card.Img src={image} className="" alt="product-image" />
                </div>
                <div className="col-md-4 d-flex">{props.title}</div>
                <div className="col-md-2 d-flex justify-content-center">₹ {props.price}</div>
                <div className="col-md-1 d-flex justify-content-center">
                    <Button className="quantity-button" onClick={decrementHandler}>-</Button>
                    <input className="quantity-text" type="text" value={props.quantity} readOnly />
                    <Button className="quantity-button" onClick={incrementHandler}>+</Button>
                </div>
                <div className="col-md-2 d-flex justify-content-center">₹ {props.price * props.quantity}</div>
                <div className="col-md-1 d-flex justify-content-center" style={{ color: "red", fontSize: 25, cursor: "pointer" }} onClick={() => dispatch(removeFromCart(props.id))}><i className="bi bi-trash" /></div>
            </Card.Body>
        </Card>
    )
}

export default CartItem;