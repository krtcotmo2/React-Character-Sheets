import axios from "axios";
import { getCookie } from "react-use-cookie";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const httpGet = async (url: string): Promise<any> => {
    return await axios
        .get(`${siteHost}${url}`, {headers:{authorization: getCookie('token')}})
        .then(results => {
            return results.data
        })
        .catch((err) => {
            throw err;
        });
}

export const httpPut = async (url: string, body:any) => {
    return await axios
        .put(`${siteHost}${url}`, body, {headers:{authorization: getCookie('token')}})
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}

export const httpDelete = async (url: string) => {
    return await axios
        .delete(`${siteHost}${url}`, {headers:{authorization: getCookie('token')}})
        .then(results => results.data)
        .catch((err) => {
            throw new Error(err.message);
        });
}