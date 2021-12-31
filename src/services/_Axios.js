import axios from 'axios'
export const BASE_API = process.env.REACT_APP_BASE_API


const defaultOptions = {
    baseURL: BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
};


const local = JSON.parse(localStorage.getItem('persist:root'));
const access_token = local.access_token;

const instance = axios.create(defaultOptions)
instance.interceptors.request.use(function (config) {

    let auth = access_token.replace(/"/g,'');
    const token = auth ? auth : 'unAuthorization';
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default instance;