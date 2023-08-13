import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import success from '../../assets/success.svg';

const Createsuccess = () => {

    const navigate = useNavigate();

    const buttonHandler = () => {
        navigate("/products", {
            replace: true,
            state: {
                title: "Product List"
            }
        })
    }

    return (
        <section className="overflow-hidden pt-0 pb-5 pt-sm-5 bg-white ">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 text-center mx-auto">
                        <img src={success} height={270} className="mb-3" alt="success" />
                        <h2 className=" mb-3">Your product has been created successfully.</h2>
                        <Button variant="info" onClick={buttonHandler}>Back to Products</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Createsuccess;