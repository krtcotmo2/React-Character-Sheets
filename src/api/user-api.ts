import axios from "axios";
import { showError } from "../components/modal/business-logic/error-handler";
import { User } from "../interfaces/user";

const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const loginUser = async (userEmail: string, userPassword: string) => {
    return await axios
    .post(`${siteHost}/api/user/login`, {userEmail, userPassword})
    .then(arg => arg.data)
    .catch((err) => {
        throw err;
    });
}

export const createNewUser = async (userEmail: string, userPassword: string, userName: string) => {
    return await axios
    .post(`${siteHost}/api/user/signup`, {userEmail, userPassword, userName})
    .then(arg => arg.data)
    .catch((err) => {
        throw err;
    });
}

export const resetPassword = async (userEmail: string) => {
    return await axios
    .post(`${siteHost}/api/user/resetPassword`, {userEmail})
    .then(arg => arg.data)
    .catch((err) => {
        throw err;
    });
}

export const updatePassword = async (userId: string, password: string, user: User) => {
    return await axios
    .put(`${siteHost}/api/user/update/${userId}`, {userPassword: password, user})
    .then(arg => {
        showError('password_updated')
        return arg.data
    })
    .catch((err) => {
        throw err;
    });
}