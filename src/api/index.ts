import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://ec2-18-117-144-170.us-east-2.compute.amazonaws.com:5000'
});


export function setAxiosInterceptors() {
    axios.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}

export function getToken() {
    return localStorage.getItem("token");
}