import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import ProductCard from './ProductCard';


const Product = (props) => {

  const [checked, setChecked] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  const checkboxHandler = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...updatedList, event.target.value];
    } else {
      updatedList.splice(updatedList.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    props.checkedData(updatedList);
  }

  const searchBarHandler = useCallback(() => {
    const fData = props.data.filter(product => {
      if (props.searchValue === '') {
        return product;
      } else {
        return product.title.toLowerCase().includes(props.searchValue.toLowerCase());
      }
    })
    setFilteredData(fData);
  }, [props.data, props.searchValue]);

  useEffect(() => {
    searchBarHandler();
  }, [searchBarHandler])


  return (
    <div className="col-lg-10 col-xxl-6">
      {filteredData.length > 0 ? (
        filteredData.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description} showDescription={props.fields.description}
            brand={product.brand} showBrand={props.fields.brand}
            price={product.price}
            stock={product.stock} showStock={props.fields.stock}
            rating={product.rating} showRating={props.fields.rating}
            category={product.category} showCategory={props.fields.category}
            checkboxHandler={checkboxHandler} />
        ))) : (
        <Card className="p-2 shadow overflow-hidden">
          <Card.Body className="d-flex justify-content-center">
            <Card.Title style={{ fontWeight: "bold" }}>No Product Found</Card.Title>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default Product;