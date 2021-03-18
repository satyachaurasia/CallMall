import axios from "../axios";

/**
 * Gets project of an Organization
 * @function loadPhoneBooks
 * @returns {array} Array of Phone Books
 */
export const loadPhoneBooks = async (authToken) => {
  try {
    const response = await axios.get(`core/phone-book/`, {
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
 * Creates a Phone Book
 * @function createPhoneBook
 * @param  {object} data to be used to create phone book
 * @param  {string} authToken
 * @returns {object} created object
 */
export const createPhoneBook = async (authToken, data) => {
  try {
    const response = await axios.post("core/phone-book/", data, {
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
 * Update Phone Book
 * @function updatePhoneBook
 * @param  {object} updates to be used to update Phone Book
 * @param  {int} id of the object to be updated
 * @param  {string} authToken
 * @returns {object} updated object
 */
export const updatePhoneBook = async (authToken, phoneBookId, updates) => {
  try {
    const response = await axios.patch(
      `core/phone-book/${phoneBookId}/`,
      updates,
      {
        headers: {
          authorization: `Token ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Delete Phone Book
 * @function deletePhoneBook
 * @param  {int} id of the object to be deleted
 * @param  {string} authToken
 * @returns {status}
 */
export const deletePhoneBook = async (authToken, phoneBookId) => {
  try {
    const response = await axios.delete(`core/phone-book/${phoneBookId}/`, {
      headers: {
        authorization: `Token ${authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
