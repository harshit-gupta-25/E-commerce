import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import pimage from '../../assets/image.png';
import { getAllProducts } from '../../api/ProductApi';
import { FaRupeeSign } from 'react-icons/fa';

const HomeCard = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        getAllProducts()
            .then(data => {
                if (mounted) {
                    data.sort((a, b) => b.views - a.views);
                    setData(data);
                }
            })

        return () => mounted = false;
    }, [])


    return (
        <section className="mb-5 mt-3">
            <div className="container">
                <div className="row g-4">
                    {data.slice(0, 4).map((product) => (
                        <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                            <Card className="shadow h-100">
                                <Card.Img variant="top" src={pimage} className="card-home-img" />
                                <Card.Body className="pb-0">
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Subtitle className="mb-2">{product.brand}</Card.Subtitle>
                                </Card.Body>
                                <Card.Footer className="pt-0 pb-3">
                                    <div className="text-end">
                                        <h5 className="text-success"><FaRupeeSign className="mb-1" />{product.price}</h5>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeCard;