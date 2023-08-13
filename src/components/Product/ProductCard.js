import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import LoginRequired from '../ui/modal/LoginRequired';
import { FaRupeeSign } from 'react-icons/fa';
import AuthContext from '../../store/auth-context';
import image from '../../assets/default-product-image.png';

const ProductCard = (props) => {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const clickHandler = () => {
    if (auth.isLoggedIn) {
      navigate(`/${props.id}/${props.title}`);
    } else {
      handleShow();
    }
  }

  return (
    <>
      <Card className="p-2 shadow overflow-hidden mt-3">
        <div className="row g-0">
          {auth.isLoggedIn && (
            <div className="col-md-1 product-checkbox">
              <Form.Check type="checkbox" value={props.id} onChange={props.checkboxHandler} />
            </div>)}
          <div className="col-md-4 overflow-hidden">
            <Card.Img src={image} className="" style={{ height: "12vw", objectFit: "contain" }} alt="product-image" />
          </div>
          <Card.Body className="col-md-7 pt-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              {props.showCategory && <div className="badge bg-primary text-white mb-2 mb-sm-0">{props.category}</div>}
              {props.showRating && <h6 className="d-flex me-4 mb-0"><Rating name="rating" className="me-2" size="small" value={+props.rating} precision={0.5} readOnly />{props.rating}</h6>}
            </div>
            <Card.Link onClick={clickHandler} className="product-title"><Card.Title style={{ fontWeight: "bold" }}>{props.title}</Card.Title></Card.Link>
            {props.showBrand && <Card.Subtitle className="mb-2">{props.brand}</Card.Subtitle>}
            <div className="">
              {props.showDescription && <p className="text-truncate d-none d-lg-block mb-1">{props.description}</p>}
              <h5 className="text-success mb-1"><FaRupeeSign className="mb-1" />{props.price}</h5>
              {props.showStock && <h6 className="mb-0">Stock Available: {props.stock}</h6>}
            </div>
          </Card.Body>
        </div>
      </Card>
      <LoginRequired show={show} handleClose={handleClose} />


      {/* <div class="card rounded overflow-hidden shadow mt-3">
        <div class="row g-0">
          <img src={image} className="col-md-4" alt="card image" />
          <div class="col-md-8">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <h5 class="card-title mb-0"><a href="#">The Complete Digital Marketing Course - 12 Courses in 1</a></h5>
              </div>
              <ul class="list-inline mb-1">
                <li class="list-inline-item h6 fw-light mb-1 mb-sm-0"><i class="far fa-clock text-danger me-2"></i>6h 56m</li>
                <li class="list-inline-item h6 fw-light mb-1 mb-sm-0"><i class="fas fa-table text-orange me-2"></i>82 lectures</li>
                <li class="list-inline-item h6 fw-light"><i class="fas fa-signal text-success me-2"></i>Beginner</li>
              </ul>
              <ul class="list-inline mb-0">
                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item me-0 small"><i class="fas fa-star-half-alt text-warning"></i></li>
                <li class="list-inline-item ms-2 h6 fw-light">4.5/5.0</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}


      {/* <div class="card shadow p-2 mt-3">
        <div class="row g-0">
          <img src={image} class="rounded-2 col-md-4" alt="Card image" />
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"><a href="#">The Complete Digital Marketing Course - 12 Courses in 1</a></h5>
              <p class="text-truncate">Explained propriety off out perpetual his you. Dependent contented he explained propriety off out perpetual his you. </p>
              <ul class="list-inline">
                <li class="list-inline-item h6 fw-light mb-1 mb-sm-0"><i class="far fa-clock text-danger me-2"></i>6h 56m</li>
                <li class="list-inline-item h6 fw-light mb-1 mb-sm-0"><i class="fas fa-table text-orange me-2"></i>82 lectures</li>
                <li class="list-inline-item h6 fw-light"><i class="fas fa-signal text-success me-2"></i>Beginner</li>
              </ul>
              <div class="d-sm-flex justify-content-sm-between align-items-center">
                <div class="mt-3 mt-sm-0">
                  <a href="#" class="btn btn-dark">View more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default ProductCard;