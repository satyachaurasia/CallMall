import axios from "../axios";

/**
 * Logs a user in with the provided credentials
 * @function login
 * @param {string} username The username of user
 * @param {string} password A password to log in with
 * @returns {object} The user object
 */
export const login = async (username, password) => {
  try {
    const data = { username, password };
    const response = await axios.post(`core/login-token/`, data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Register a user in with the provided data
 * @function registerUser
 * @param {object} data The data to signup with
 * @returns {object} The user details
 */
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`core/signup/`, data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
