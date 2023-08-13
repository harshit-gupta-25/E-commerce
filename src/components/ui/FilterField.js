import React, { useRef } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { FaSlidersH } from 'react-icons/fa';

const FilterField = (props) => {

    const descriptionInputRef = useRef();
    const brandInputRef = useRef();
    const categoryInputRef = useRef();
    const ratingInputRef = useRef();
    const stocksInputRef = useRef();

    const submitHandler = () => {
        props.updateFields({
            description: descriptionInputRef.current.checked,
            brand: brandInputRef.current.checked,
            rating: ratingInputRef.current.checked,
            category: categoryInputRef.current.checked,
            stock: stocksInputRef.current.checked
        })
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" size="lg" className="mb-0">
                <FaSlidersH className="mb-1 me-2" />Filter
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow">
                <Dropdown.ItemText>
                    <Form.Check type="checkbox" defaultChecked="true" label="Category" ref={categoryInputRef} onChange={submitHandler} />
                    <Form.Check type="checkbox" defaultChecked="true" label="Rating" ref={ratingInputRef} onChange={submitHandler} />
                    <Form.Check type="checkbox" defaultChecked="true" label="Brand" ref={brandInputRef} onChange={submitHandler} />
                    <Form.Check type="checkbox" defaultChecked="true" label="Description" ref={descriptionInputRef} onChange={submitHandler} />
                    <Form.Check type="checkbox" label="Quantity" ref={stocksInputRef} onChange={submitHandler} />
                </Dropdown.ItemText>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FilterField;