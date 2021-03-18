import { login, registerUser } from "../../services/authenticationServices";
import { loadCallRecord } from "../../services/callRecordServices";
import {
  createContact,
  deleteContact,
  loadContacts,
  updateContact,
} from "../../services/ContactServices";
import {
  createAutoDialer,
  loadAutoDialer,
  updateAutoDialer,
  deleteAutoDialer,
} from "../../services/DialerServices";
import {
  loadPhoneBooks,
  createPhoneBook,
  updatePhoneBook,
  deletePhoneBook,
} from "../../services/PhoneBookServices";
import userTypes from "./user.types";

export const signInStart = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.SIGN_IN_START });
    const response = await login(username, password);
    localStorage.setItem("token", response.token);
    dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: response });
  } catch (err) {
    dispatch({
      type: userTypes.SIGN_IN_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const signupStart = (data) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.SIGN_UP_START });
    const response = await registerUser(data);
    localStorage.setItem("token", response.token);
    dispatch({ type: userTypes.SIGN_UP_SUCCESS, payload: response });
  } catch (err) {
    dispatch({
      type: userTypes.SIGN_UP_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: userTypes.SIGN_OUT });
};

export const loadPhoneBookStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.LOAD_PHONE_BOOK_START });
    const response = await loadPhoneBooks(authToken);
    dispatch({
      type: userTypes.LOAD_PHONE_BOOK_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.LOAD_PHONE_BOOK_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const loadContactStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.LOAD_CONTACT_START });
    const response = await loadContacts(authToken);
    dispatch({
      type: userTypes.LOAD_CONTACT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.LOAD_CONTACT_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const createPhoneBookStart = (authToken, data) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.CREATE_PHONE_BOOK_START });
    const response = await createPhoneBook(authToken, data);
    dispatch({
      type: userTypes.CREATE_PHONE_BOOK_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.CREATE_PHONE_BOOK_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const updatePhoneBookStart = (authToken, phoneBookId, updates) => async (
  dispatch
) => {
  try {
    dispatch({ type: userTypes.UPDATE_PHONE_BOOK_START });
    const response = await updatePhoneBook(authToken, phoneBookId, updates);
    dispatch({
      type: userTypes.UPDATE_PHONE_BOOK_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.UPDATE_PHONE_BOOK_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const deletePhoneBookStart = (authToken, phoneBookId) => async (
  dispatch
) => {
  try {
    dispatch({ type: userTypes.DELETE_PHONE_BOOK_START });
    await deletePhoneBook(authToken, phoneBookId);
    dispatch({
      type: userTypes.DELETE_PHONE_BOOK_SUCCESS,
      payload: phoneBookId,
    });
  } catch (err) {
    dispatch({
      type: userTypes.DELETE_PHONE_BOOK_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const createContactStart = (authToken, data) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.CREATE_CONTACT_START });
    const response = await createContact(authToken, data);
    dispatch({
      type: userTypes.CREATE_CONTACT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.CREATE_CONTACT_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const updateContactStart = (authToken, contactID, updates) => async (
  dispatch
) => {
  try {
    dispatch({ type: userTypes.UPDATE_CONTACT_START });
    const response = await updateContact(authToken, contactID, updates);
    dispatch({
      type: userTypes.UPDATE_CONTACT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.UPDATE_CONTACT_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const deleteContactStart = (authToken, contactID) => async (
  dispatch
) => {
  try {
    dispatch({ type: userTypes.DELETE_CONTACT_START });
    await deleteContact(authToken, contactID);
    dispatch({
      type: userTypes.DELETE_CONTACT_SUCCESS,
      payload: contactID,
    });
  } catch (err) {
    dispatch({
      type: userTypes.DELETE_CONTACT_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const loadAutoDialerStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.LOAD_AUTO_DIALER_START });
    const response = await loadAutoDialer(authToken);
    dispatch({
      type: userTypes.LOAD_AUTO_DIALER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.LOAD_AUTO_DIALER_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const createAutoDialerStart = (authToken, data) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.CREATE_AUTO_DIALER_START });
    const response = await createAutoDialer(authToken, data);
    dispatch({
      type: userTypes.CREATE_AUTO_DIALER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.CREATE_AUTO_DIALER_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const updateAutoDialerStart = (authToken, dialerId, updates) => async (
  dispatch
) => {
  try {
    dispatch({ type: userTypes.UPDATE_AUTO_DIALER_START });
    const response = await updateAutoDialer(authToken, dialerId, updates);
    dispatch({
      type: userTypes.UPDATE_AUTO_DIALER_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.UPDATE_AUTO_DIALER_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const deleteAutoDialerStart = (authToken, dialerId) => async (
  dispatch
) => {
  try {
    dispatch({ type: userTypes.DELETE_AUTO_DIALER_START });
    await deleteAutoDialer(authToken, dialerId);
    dispatch({
      type: userTypes.DELETE_AUTO_DIALER_SUCCESS,
      payload: dialerId,
    });
  } catch (err) {
    dispatch({
      type: userTypes.DELETE_AUTO_DIALER_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};

export const loadCallRecordStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.LOAD_CALL_RECORD_START });
    const response = await loadCallRecord(authToken);
    dispatch({
      type: userTypes.LOAD_CALL_RECORD_SUCCESS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: userTypes.LOAD_CALL_RECORD_FAILURE,
      payload: err.message,
    });
    throw new Error(err.message);
  }
};
