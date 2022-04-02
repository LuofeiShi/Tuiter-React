/**
 * @file contains the security service of tuit react
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SECURITY_API = `${BASE_URL}/api/auth`;

const api = axios.create({
    withCredentials: true
});

/**
 * register a new user's profile
 * @param user json body contains user profile
 * @returns {Promise<AxiosResponse<any>>} a json of new user
 */
export const register = (user) =>
    api.post(`${SECURITY_API}/register`, user)
        .then(response => response.data);

/**
 * login a user with given credential
 * @param credential credential session
 * @returns {Promise<AxiosResponse<any>>} json of status
 */
export const login = (credential) =>
    api.post(`${SECURITY_API}/login`, credential)
        .then(response => response.data);

/**
 * logout a user
 * @param user the json body that contains a user profile
 * @returns {Promise<AxiosResponse<any>>} json of status
 */
export const logout = (user) =>
    api.post(`${SECURITY_API}/logout`, user)
        .then(response => response.data);

/**
 * find a user's profile
 * @returns {Promise<AxiosResponse<any>>} the profile of the current user
 */
export const profile = () =>
    api.post(`${SECURITY_API}/profile`)
        .then(response => response.data);
