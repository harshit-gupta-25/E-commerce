import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './Product.css';

const ProductPage = () => {

    const location = useLocation();
    return (
        <>
            <section className="bg-dark align-items-center d-flex product-header">
                <div className="container">
                    <h1 className="text-white text-center">{location.state.title}</h1>
                </div>
            </section>
            <Outlet />
        </>
    )
}

export default ProductPage;