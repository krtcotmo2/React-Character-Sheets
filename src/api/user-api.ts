import axios from "axios";
import { showError } from "../components/modal/business-logic/error-handler";
import { User } from "../interfaces/user";
import { getConfiguration } from "../app-config/app-config";
import { getCookie } from "react-use-cookie";
import { httpGet, httpPut } from "./http-calls";

const siteHost: string = getConfiguration().siteHost;


export const loginUser = async (userEmail: string, userPassword: string) => {
    return await axios
    .post(`${siteHost}/api/user/login`, {userEmail, userPassword}, {headers: {authorization: getCookie('token')}})
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
    const url = `/api/user/update/${userId}`;
    return await httpPut(url, {userPassword: password, user})
    .then(arg => {
        showError('password_updated')
        return arg.data
    })
    .catch((err) => {
        throw err;
    });
}

export const checkStatus = async() =>{
    const url = `/api/user/checkStatus`;
    return await httpGet(url);
}