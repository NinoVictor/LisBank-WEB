import axios from 'axios'
import { getToken } from '../utils/jwt';

export const api = createInstance();

function createInstance() {
    var instance = axios.create({
        baseURL: 'http://ec2-18-117-144-170.us-east-2.compute.amazonaws.com:5000'
    });
    const token = getToken();

    if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return instance;
}

export function setAxiosInterceptors() {
    axios.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}
