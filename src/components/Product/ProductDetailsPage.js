import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { FaRupeeSign, FaBoxes } from "react-icons/fa";
import { BsEyeFill, BsFillGridFill, BsFillPatchCheckFill, BsPencilSquare } from "react-icons/bs";
import { getProductByID, deleteProductByID } from "../../api/ProductApi";
import EditingProduct from "../ui/modal/EditRequest";
import DeletingProduct from "../ui/modal/DeleteRequest";
import DeleteSuccess from "../ui/modal/DeleteSuccess";
import image from "../../assets/default-image.jpg";
import "./Product.css";

const ProductDetailsPage = () => {
  let params = useParams();
  const id = params.id;
  const title = params.title;

  const [eshow, setEshow] = useState(false);
  const [dshow, setDshow] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const handleEditShow = () => setEshow(true);
  const handleDeleteShow = () => setDshow(true);
  const handleDeleteSuccess = () => setDeleteSuccess(true);
  const handleClose = () => {
    setDshow(false);
    setEshow(false);
    setDeleteSuccess(false);
  };

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getProductByID(id).then((product) => {
      if (mounted) {
        // const pview = {};
        // pview.views = product.views + 1;
        // updateViews(id, pview);
        setData(product);
        console.log(product);
      }
    });

    return () => (mounted = false);
  }, [id]);

  const deleteButtonHandler = () => {
    handleDeleteShow();
  };

  const deleteProduct = () => {
    deleteProductByID(id);
    handleClose();
    handleDeleteSuccess();
    setTimeout(() => {
      navigate("/products", {
        state: {
          title: "Product List",
        },
      });
    }, 2000);
  };

  const editButtonHandler = () => {
    handleEditShow();
  };

  const editPage = () => {
    handleClose();
    navigate(`/products/${id}/${title}/edit`, {
      state: {
        title: "Update Product Details",
        data: data,
      },
    });
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="mb-3 text-end">
          <Button className="me-2" type="button" variant="warning" onClick={editButtonHandler}>
            <BsPencilSquare className="me-2 mb-1" />
            Edit
          </Button>
          <Button className="me-3" type="button" variant="danger" onClick={deleteButtonHandler}>
            <i className="bi bi-trash me-2" />
            Delete
          </Button>
        </div>
        <div className="row g-4">
          <div className="col-xl-4">
            <Card className="shadow">
              <Card.Img src={image} className="product-card-img" alt="product-img" />
            </Card>
          </div>
          <div className="col-xl-8">
            <h1 className="mb-3" style={{ fontWeight: "bold" }}>
              {data.title}
            </h1>
            <Rating className="mb-3" value={+data.rating} precision={0.5} size="large" readOnly />
            <h3 className="mb-4 text-success">
              <FaRupeeSign className="mb-1 me-1" />
              {data.price}
            </h3>
            <h4 className="fw-bold">Description</h4>
            <p>{data.description}</p>
            <div className="row mb-3">
              <div className="col-md-6">
                <ListGroup as="ul">
                  <ListGroup.Item as="li" className="px-0 product-item">
                    <span className="h6 fw-normal me-2">
                      <BsFillGridFill className="text-primary me-2 mb-1" />
                      Category:
                    </span>
                    <span className="h6 fw-bold">{data.category}</span>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="px-0 product-item">
                    <span className="h6 fw-normal me-2">
                      <BsFillPatchCheckFill className="text-primary me-2 mb-1" />
                      Brand:
                    </span>
                    <span className="h6 fw-bold">{data.brand}</span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="col-md-6">
                <ListGroup as="ul">
                  <ListGroup.Item as="li" className="px-0 product-item">
                    <span className="h6 fw-normal me-2">
                      <FaBoxes className="text-primary me-2 mb-1" />
                      Stock:
                    </span>
                    <span className="h6 fw-bold">{data.stock}</span>
                  </ListGroup.Item>
                  {/* <ListGroup.Item as="li" className="px-0 product-item">
										<span className="h6 fw-normal me-2"><FaStar className="text-primary me-2 mb-1" />Rating:</span>
										<span className="h6 fw-bold">4.5</span>
									</ListGroup.Item> */}
                  <ListGroup.Item as="li" className="px-0 product-item">
                    <span className="h6 fw-normal me-2">
                      <BsEyeFill className="text-primary me-2 mb-1" />
                      Visited by:
                    </span>
                    <span className="h6 fw-bold">{data.views}</span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
        <EditingProduct show={eshow} handleClose={handleClose} editButtonHandler={editPage} text="product" />
        <DeletingProduct show={dshow} handleClose={handleClose} deleteProduct={deleteProduct} />
        <DeleteSuccess show={deleteSuccess} handleClose={handleClose} text="Product" />
      </div>
    </section>
  );
};

export default ProductDetailsPage;
