import React, { useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './searchBar.css';

const SearchBar = (props) => {

    const searchInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredSearch = searchInputRef.current.value;
        props.searchValue(enteredSearch);
    }

    return (
        <Form className="border p-2 search-form w-75" onSubmit={submitHandler}>
            <InputGroup>
                <Form.Control className="me-1 px-3 py-2 search-input" name="search" type="search" placeholder="Search Product" ref={searchInputRef} onChange={submitHandler} />
                <Button className="search-button px-3 py-2" type="submit" variant="primary"><FaSearch className="mb-1" /></Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBar;