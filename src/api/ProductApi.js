import axios from 'axios';

let url = "http://localhost:3001/ProductDetails";


const getAllProducts = async () => {
    const response = await axios.get(url);
    return response.data;
}

const addProduct = async (product) => {
    await axios.post(url, product);
    return true;
}

const deleteProductByID = async (id) => {
    await axios.delete(`${url}/${id}`);
}

const updateProductByID = async (id, product) => {
    await axios.patch(`${url}/${id}`, product);
    return true;
}

const getProductByID = async (id) => {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
}

const updateViews = async (id, product) => {
    await axios.patch(`${url}/${id}`, product);
    return true;
}

const deleteProducts = async (ids) => {
    await ids.forEach(id => {
         axios.delete(`${url}/${id}`);
    })
}

export {
    getAllProducts,
    addProduct,
    deleteProductByID,
    updateProductByID,
    getProductByID,
    updateViews,
    deleteProducts
};