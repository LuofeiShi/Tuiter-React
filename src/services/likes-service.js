/**
 * @file api service for like operations
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

/**
 * Find all tuits that liked by a given user.
 * @param userId primary key of the user
 * @returns {Promise<AxiosResponse<any>>} a list of tuits in json
 */
export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

/**
 * find all users that like a tuit
 * @param tid primary key of a tuit
 * @returns {Promise<AxiosResponse<any>>} a list of users in json
 */
export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

/**
 * Update a user to like a tuit
 * @param uid the primary key of user
 * @param tid the primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} finish status in json
 */
export const userLikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

/**
 * Update a user to like a tuit
 * @param uid the primary key of user
 * @param tid the primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} finish status in json
 */
export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

/**
 * Check if a user like a tuit
 * @param uid primary key of user
 * @param tid primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} return a state of json contains boolean value of 'like'
 */
export const tuitLikedByMe = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);