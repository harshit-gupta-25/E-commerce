import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AuthContext from '../../store/auth-context';
import { FaPlus } from 'react-icons/fa';
import Product from './Product';
import SearchBar from '../ui/SearchBar';
import FilterField from '../ui/FilterField';
import { getAllProducts, deleteProducts } from '../../api/ProductApi';
import LoginRequired from '../ui/modal/LoginRequired';
import DeleteRequest from '../ui/modal/DeleteRequest';
import DelectSuccess from '../ui/modal/DeleteSuccess';
// import axios from 'axios';


const ProductList = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [pdata, setpdata] = useState([]);
    const [checkedValue, setCheckedValue] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [fields, setFields] = useState({
        description: true,
        brand: true,
        rating: true,
        category: true,
        stock: false
    });

    const [show, setShow] = useState(false);
    const [deleteRequest, setDeleteRequest] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const handleShow = () => setShow(true);
    const handleDeleteRequest = () => setDeleteRequest(true);
    const handleDeleteSuccess = () => setDeleteSuccess(true);
    const handleClose = () => { setShow(false); setDeleteRequest(false); setDeleteSuccess(false); }

    useEffect(() => {
        let mounted = true;
        getAllProducts()
            .then(data => {
                if (mounted) {
                    setpdata(data);
                }
            })
        return () => mounted = false;
    }, []);

    const addButtonHandler = () => {
        if (auth.isLoggedIn) {
            navigate("add", {
                state: {
                    title: "Add a new Product"
                }
            })
        } else {
            handleShow();
        }
    }

    const deleteProduct = () => {
        handleClose();
        deleteProducts(checkedValue);

        // checkedValue.forEach(id => {
        //     axios.delete(`http://localhost:3001/ProductDetails/${id}`)
        //         .then(res => {
        //             const del = pdata.filter(product => id !== product.id);
        //             setpdata(del);
        //         })
        // })
        
        handleDeleteSuccess();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const deleteButtonHandler = () => {
        if (auth.isLoggedIn) {
            if (checkedValue.length > 0) {
                handleDeleteRequest();
            } else {
                alert("No Product selected.")
            }
        }
        else {
            handleShow();
        }
    }

    const checkedData = (value) => {
        setCheckedValue(value);
    }

    const searchValueHandler = (value) => {
        setSearchValue(value);
    }

    const updateFields = (value) => {
        setFields(value);
    }


    return (
        <section className="product-content">
            <div className="container">
                <div className="row mb-4 align-items-center bg-white" style={{ borderRadius: "10px", padding: "10px" }}>
                    <div className="col-sm-6 col-xl-6 d-flex justify-content-center">
                        <SearchBar searchValue={searchValueHandler} />
                    </div>
                    <div className="col-sm-6 col-xl-2 mt-3 mt-xl-0">
                        <FilterField updateFields={updateFields} />
                    </div>
                    <div className="col-sm-6 col-xl-2 mt-3 mt-xl-0 text-end">
                        <Button variant="primary" size="lg" className="mb-0" onClick={addButtonHandler}><FaPlus className="me-2 mb-1" />Add</Button>
                    </div>
                    <div className="col-sm-6 col-xl-2 mt-3 mt-xl-0">
                        <Button variant="danger" size="lg" className="mb-0" onClick={deleteButtonHandler}><i className="bi bi-trash me-2" />Delete</Button>
                    </div>
                </div>
                <div className="row g-4 justify-content-center">
                    <Product data={pdata} checkedData={checkedData} searchValue={searchValue} fields={fields} />
                </div>
                <LoginRequired show={show} handleClose={handleClose} />
                <DeleteRequest show={deleteRequest} handleClose={handleClose} deleteProduct={deleteProduct} />
                <DelectSuccess show={deleteSuccess} handleClose={handleClose} text="Products" />
            </div>
        </section>
    )
}

export default ProductList;