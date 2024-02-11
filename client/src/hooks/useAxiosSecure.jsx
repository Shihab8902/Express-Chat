import axios from 'axios';

export const axiosSecure = axios.create({
    baseURL: "http://localhost:9000",

});

const useAxiosSecure = () => {
    const token = localStorage.getItem("session-token");

    // Add a request interceptor
    axiosSecure.interceptors.request.use(function (config) {
        config.headers.authorization = `bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        console.log(error);
        return Promise.reject(error);
    });





    return axiosSecure;
}

export default useAxiosSecure