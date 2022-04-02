/**
 * @file contains the api service of user related functions
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

/**
 * create a user
 * @param user the body of user
 * @returns {Promise<AxiosResponse<any>>} the created user in json
 */
export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

/**
 * find all users in the server database
 * @returns {Promise<AxiosResponse<any>>} a list of json of users
 */
export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

/**
 * find a user by user primary key
 * @param uid the primary key of user
 * @returns {Promise<AxiosResponse<any>>} a json of user
 */
export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

/**
 * delete a user's profile in database
 * @param uid primary key of user
 * @returns {Promise<AxiosResponse<any>>} a json of status
 */
export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

/**
 * delete a user
 * @param username the primary key of a user
 * @returns {Promise<AxiosResponse<any>>} a json of status
 */
export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;