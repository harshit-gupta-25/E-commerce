import React from "react";
//import { Carousel } from 'react-bootstrap';
import HomeCard from "./HomeCard";
import image from "../../assets/image1.png";
import "./Home.css";

const Home = () => {
  return (
    // <Carousel variant="dark">
    //   <Carousel.Item>
    //     <img src={image} alt="" className="home-img" />
    //     <Carousel.Caption>
    //       <h1>Welcome</h1>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
    <>
      <section className="bg-white">
        <div className="container">
          <div className="row align-items-center pb-5">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="banner-content">
                <div className="banner-title">
                  <h1 style={{ color: "#918d85" }}>
                    <span style={{ color: "#fe980f" }}>E</span>-Shopper
                  </h1>
                  <p style={{ color: "black" }}>
                    Purchase from variety of products at unbeatable prices.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6">
              <div className="d-none d-md-block">
                <img src={image} alt="" className="banner-image" />
              </div>
            </div>
          </div>
          <div className="row pt-4 pb-4 mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="fs-1">Our Trending Product</h1>
              <p className="mb-0">Check out most 🔥 product</p>
            </div>
          </div>
        </div>
      </section>
      <HomeCard />
    </>
  );
};

export default Home;
