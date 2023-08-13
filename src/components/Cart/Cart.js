import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal, clearCart } from '../../reducer/cartSlice';
import emptyCart from '../../assets/cart1.png';
import './Cart.css';

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems, total } = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(calculateTotal());
    }, [cartItems, dispatch]);

    return (
        <>
            <section className="bg-dark align-items-center d-flex cart-header">
                <div className="container">
                    <h1 className="text-white text-center">Shopping Cart</h1>
                </div>
            </section>
            <section className="cart-content">
                <div className="container-fluid">
                    <div className="row m-0 bg-white d-flex" style={{ borderRadius: "10px", padding: "10px" }}>
                        <div className="col-lg-8">
                            {cartItems.length > 0 ? (
                                <div style={{ "margin-top": "4rem", "margin-bottom": "4rem" }}>
                                    <Card className="">
                                        <div className="row cart-title py-2">
                                            <Card.Title className="col-md-6 d-flex justify-content-center">Product</Card.Title>
                                            <Card.Title className="col-md-2 d-flex justify-content-center">Price</Card.Title>
                                            <Card.Title className="col-md-1 d-flex justify-content-center">Quantity</Card.Title>
                                            <Card.Title className="col-md-2 d-flex justify-content-center">Total</Card.Title>
                                        </div>
                                    </Card>
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            quantity={item.quantity} />
                                    ))}
                                </div>) : (
                                <div className="d-flex align-items-center justify-content-center">
                                    <img src={emptyCart} alt="Empty Cart" />
                                </div>
                            )}
                        </div>

                        <div className="col-lg-4">
                            <div className="summary">
                                <h3 className="summary-title">Cart Total</h3>

                                <table className="table-summary">
                                    <tbody>
                                        <tr className="summary-subtotal">
                                            <td style={{ width: "100%" }}>Subtotal:</td>
                                            <td><small>₹</small>{total}</td>
                                        </tr>
                                        <tr className="summary-shipping">
                                            <td style={{ width: "100%" }}>Shipping:</td>
                                        </tr>
                                        <tr className="summary-shipping-row">
                                            <td style={{ width: "100%" }}>Shipping Charges:</td>
                                            <td>₹  0</td>
                                        </tr>
                                        <tr className="summary-total">
                                            <td style={{ width: "100%" }}>Total:</td>
                                            <td><small>₹</small>{total}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <Button className="btn-outline-primary-2" onClick={() => dispatch(clearCart())}>PROCEED TO CHECKOUT</Button>
                            </div>

                            <Link to="/products" state={{ title: "Product List" }}><Button className="btn-outline-dark-2 mb-3">CONTINUE SHOPPING</Button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart;