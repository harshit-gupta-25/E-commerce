import React from 'react';
import { Link } from 'react-router-dom';
import error404 from '../../assets/error404.svg';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <section className="pt-5 pb-5 bg-white">
            <div className="container">
                <div className="text-center">
                    <img src={error404} className="mb-4" alt="" />
                    <h1 className="display-1 text-danger mb-0">404</h1>
                    <h1>Oh no, something went wrong!</h1>
                    <p className="mb-4">Either something went wrong or this page doesn't exist anymore.</p>
                    <Link to="/">
                        <button className="btn btn-primary mb-0">Take me to Homepage</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound;