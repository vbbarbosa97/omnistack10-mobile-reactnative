import axios from 'axios';

const api = axios.create({
    baseURL: 'https://oministack10-backend.herokuapp.com',
});

export default api;