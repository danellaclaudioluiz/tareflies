import axios from 'axios';
import { toast } from 'react-toastify';

export const BACKEND_URL = process.env.REACT_APP_BACKEND;

export const validateEmail = (email) => {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}

export const registerUser = async(userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/register`, 
            userData, 
            { withCredentials: true });

        if (response.statusText === "OK") {
            toast.success("User registered successfuly.");
        }
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
};

export const loginUser = async(userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/login`, 
            userData, 
            { withCredentials: true });

        if (response.statusText === "OK") {
            toast.success("Login successful.");
        }
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
};

export const logoutUser = async(userData) => {
    try {
        await axios.get(
            `${BACKEND_URL}/api/users/logout`, 
            userData, 
            { withCredentials: true });
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
};

export const forgotPassword = async(userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/forgotpassword`, userData);
        toast.success(response.data.message);
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
};

export const resetPassword = async(userData, resetToken) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
};

export const getLoginStatus = async() => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/users/loggedin`);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
};