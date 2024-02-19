import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../Context/AuthProvider';


export const axiosSecure = axios.create({
    baseURL: "http://localhost:9000",

});

const useAxiosSecure = () => {



    const context = useContext(UserContext);
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
        if (error.status === 401 || error.status === 403) {
            context?.logOutUser();
            window.location.reload();
        }
        return Promise.reject(error);
    });





    return axiosSecure;
}

export default useAxiosSecure