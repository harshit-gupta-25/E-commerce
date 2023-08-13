import axios from 'axios';

let url = "http://localhost:3001/UserDetails";

const addUser = async (user) => {
    await axios.post(url, user);
}

const loginUser = async (email, password) => {
    const response = await axios.get(`${url}?email=${email}&password=${password}`);
    //console.log(response.data);
    return response.data;
}

const updateUser = async (id, user) => {
    await axios.patch(`${url}/${id}`, user);
    return true;
}

const updatePassword = async (id, password) => {
    await axios.patch(`${url}/${id}`, password);
    return true;
}

const deleteUser = async (id) => {
    await axios.delete(`${url}/${id}`);
    return true;
}

const getUserByID = async (id) => {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
}

export {
    addUser,
    loginUser,
    updateUser,
    updatePassword,
    deleteUser,
    getUserByID
};