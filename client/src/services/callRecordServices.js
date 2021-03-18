import axios from "../axios";

/**
 * Gets Contacts
 * @function loadCallRecord
 * @returns {array} Array of Contact
 */
export const loadCallRecord = async (authToken) => {
  try {
    const response = await axios.get(`core/call-records/`, {
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
