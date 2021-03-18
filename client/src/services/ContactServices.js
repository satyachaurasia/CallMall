import axios from "../axios";

/**
 * Gets Contacts
 * @function loadContacts
 * @returns {array} Array of Contact
 */
export const loadContacts = async (authToken) => {
  try {
    const response = await axios.get(`core/contact/`, {
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
 * Creates a Contact
 * @function createContact
 * @param  {object} data to be used to create contact
 * @param  {string} authToken
 * @returns {object} created object
 */
export const createContact = async (authToken, data) => {
  try {
    const response = await axios.post("core/contact/", data, {
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
 * Update Contact
 * @function updateContact
 * @param  {object} updates to be used to update Contact
 * @param  {int} id of the object to be updated
 * @param  {string} authToken
 * @returns {object} updated object
 */
export const updateContact = async (authToken, contactId, updates) => {
  try {
    const response = await axios.patch(`core/contact/${contactId}/`, updates, {
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
 * Delete Contact
 * @function deleteContact
 * @param  {int} id of the object to be deleted
 * @param  {string} authToken
 * @returns {status}
 */
export const deleteContact = async (authToken, contactId) => {
  try {
    const response = await axios.delete(`core/contact/${contactId}/`, {
      headers: {
        authorization: `Token ${authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
