import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-2 bg-dark text-white mt-auto">
      <ul className="nav justify-content-center ">
        <Link to="/" className="nav-link px-2 text-white me-2">
          Home
        </Link>
        <Link
          to="/products"
          className="nav-link px-2 text-white me-2"
          state={{ title: "Product List" }}
        >
          Product
        </Link>
        <Link to="/topViewProduct" className="nav-link px-2 text-white me-2">
          Top View Product
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
