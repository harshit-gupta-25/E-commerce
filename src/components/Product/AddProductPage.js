import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Card } from 'react-bootstrap';
import * as Yup from 'yup';
import ProductForm from './ProductForm';
import { addProduct } from '../../api/ProductApi';
import './Product.css';

const AddProductPage = () => {

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Product title required')
      .min(5, 'Too Short'),
    brand: Yup.string()
      .required('product brand required'),
    category: Yup.string()
      .required('Product Category required')
      .matches(/^[aA-zZ\s]+$/, 'Invalid data'),
    price: Yup.string()
      .required('Enter product price')
      .matches(/^(\d+(\.\d{0,2})?|\.?\d{1,2})$/, 'Invalid Code'),
    stock: Yup.string()
      .required('Enter product quantity')
      .matches(/^[0-9]+$/, 'Invalid data'),
    rating: Yup.number()
      .required('Please rate the product'),
  })
  return (
    <section className="py-5">
      <div className="container">
        <Card className="border">
          <Card.Header className="px-lg-5 py-lg-3 border-bottom ">
            <h3 className="text-center">Enter Product Details</h3>
          </Card.Header>
          <Card.Body className="d-flex justify-content-center pt-5 pb-5">
            <div className="product-form-container">
              <Formik
                initialValues={{
                  title: '',
                  brand: '',
                  category: '',
                  price: '',
                  stock: '',
                  rating: '',
                  description: ''
                }}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, { resetForm, setSubmitting }) => {
                  setSubmitting(true);
                  var product = {};
                  product.title = values.title;
                  product.brand = values.brand;
                  product.category = values.category;
                  product.price = values.price;
                  product.stock = values.stock;
                  product.rating = values.rating;
                  product.description = values.description;
                  product.views = 1;
                  //alert(JSON.stringify(product));
                  if (addProduct(product)) {
                    resetForm({ values });
                    setTimeout(() => {
                      navigate("/createSuccess", { replace: true });
                    }, 500);
                  }
                  setSubmitting(false);
                }}>
                {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting, dirty }) => (
                  <ProductForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    dirty={dirty}
                  />
                )}
              </Formik>
            </div>
          </Card.Body>
        </Card>
      </div>
    </section>
  )
}

export default AddProductPage;