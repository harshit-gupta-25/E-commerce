import React, { useEffect, useState } from 'react';
//import { Card } from 'react-bootstrap';
import { getAllProducts } from '../../api/ProductApi';
import ProductGrid from './ProductGrid';
import Chart from './Chart';
import './topViewProductPage.css';

const TopViewProductPage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        getAllProducts()
            .then(data => {
                if (mounted) {
                    setData(data);
                }
            })
        return () => mounted = false;
    }, []);


    return (
        <section>
            <div className="d-flex align-items-center viewPage-header">
                <div className="container">
                    <h1 className="text-center text-white">Top View Product</h1>
                </div>
            </div>
            <div className="container py-4">
                <div className="row bg-white p-3 mb-4" style={{ borderRadius: "10px" }}>
                    <Chart data={data} />
                </div>
                <div className="row justify-content-center">
                    <div className="p-4 bg-white " style={{ borderRadius: "10px", width: "60%" }}>
                        <ProductGrid data={data} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopViewProductPage;