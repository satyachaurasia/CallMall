import axios from "../axios";

/**
 * Gets dialer of a user
 * @function loadAutoDialer
 * @returns {array} Array of Dialers
 */
export const loadAutoDialer = async (authToken) => {
  try {
    const response = await axios.get(`core/dialer/`, {
      headers: {
        authorization: `Token ${authToken}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Creates a Dialer
 * @function createAutoDialer
 * @param  {object} data to be used to Auto Dialer
 * @param  {string} authToken
 * @returns {object} created object
 */
export const createAutoDialer = async (authToken, data) => {
  try {
    const response = await axios.post("core/dialer/", data, {
      headers: {
        authorization: `Token ${authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Update Dialer
 * @function updateAutoDialer
 * @param  {object} updates to be used to update Dialer
 * @param  {int} id of the object to be updated
 * @param  {string} authToken
 * @returns {object} updated object
 */
export const updateAutoDialer = async (authToken, dialerId, updates) => {
  try {
    const response = await axios.patch(`core/dialer/${dialerId}/`, updates, {
      headers: {
        authorization: `Token ${authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Delete Dialer
 * @function deleteAutoDialer
 * @param  {int} id of the object to be deleted
 * @param  {string} authToken
 * @returns {status}
 */
export const deleteAutoDialer = async (authToken, dialerId) => {
  try {
    const response = await axios.delete(`core/dialer/${dialerId}/`, {
      headers: {
        authorization: `Token ${authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
