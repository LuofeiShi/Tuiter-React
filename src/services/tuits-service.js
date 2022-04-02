/**
 * @file contains the api service for tuit related functions
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

/**
 * find all tuits of the database
 * @returns {Promise<AxiosResponse<any>>} a json array of tuits
 */
export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

/**
 * find a tuit by tid
 * @param tid primary key of a tuit
 * @returns {Promise<AxiosResponse<any>>} a json of a tuit
 */
export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

/**
 * retrieve tuits posted by a given user
 * @param uid primary key of given user
 * @returns {Promise<AxiosResponse<any>>} a json of tuit
 */
export const findTuitsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

/**
 * post a tuit
 * @param uid primary key of the user
 * @param tuit body of the tuit
 * @returns {Promise<AxiosResponse<any>>} a json of the posted tuit
 */
export const createTuit = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

/**
 * post a tuit
 * @param uid primary key of the user
 * @param tuit body of the tuit
 * @returns {Promise<AxiosResponse<any>>} a json of the posted tuit
 */
export const createTuitByUser = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

/**
 * update a tuit's content
 * @param tid primary key of tuit
 * @param tuit body of the new tuit
 * @returns {Promise<AxiosResponse<any>>} a json of the updated new tuit
 */
export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

/**
 * delete a tuit
 * @param tid primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} a json of status
 */
export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);
