/**
 * @file api service for dislike operations
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
    withCredentials: true
});

/**
 * Update the dislike stats of a tuit by a user
 * @param uid primary key of user
 * @param tid primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} dislike object
 */
export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

/**
 * Check if a tuit is liked by a user
 * @param uid primary key of the user
 * @param tid primary key of the tuit
 * @returns {Promise<AxiosResponse<any>>} json contains dislike boolean value
 */
export const tuitDislikedByMe = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

/**
 * Find all tuits that a user has disliked
 * @param userId primary key of user
 * @returns {Promise<AxiosResponse<any>>} json contains a list of tuits
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

/**
 * Find all users that dislike a given tuit
 * @param tid primary key of tuit
 * @returns {Promise<AxiosResponse<any>>} json contains a list of users
 */
export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);