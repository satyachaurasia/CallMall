import userTypes from "./user.types";

export const INITIAL_STATE = {
  currentUser: null,
  token: localStorage.getItem("token"),
  error: false,
  fetching: false,
  contacts: null,
  phoneBooks: null,
  autoDialer: null,
  callRecord: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.LOAD_CALL_RECORD_START:
    case userTypes.DELETE_AUTO_DIALER_START:
    case userTypes.UPDATE_AUTO_DIALER_START:
    case userTypes.CREATE_AUTO_DIALER_START:
    case userTypes.LOAD_AUTO_DIALER_START:
    case userTypes.DELETE_CONTACT_START:
    case userTypes.UPDATE_CONTACT_START:
    case userTypes.CREATE_CONTACT_START:
    case userTypes.DELETE_PHONE_BOOK_START:
    case userTypes.UPDATE_PHONE_BOOK_START:
    case userTypes.CREATE_PHONE_BOOK_START:
    case userTypes.LOAD_CONTACT_START:
    case userTypes.LOAD_PHONE_BOOK_START:
    case userTypes.SIGN_UP_START:
    case userTypes.SIGN_IN_START: {
      return { ...state, error: false, fetching: true };
    }
    case userTypes.SIGN_UP_SUCCESS:
    case userTypes.SIGN_IN_SUCCESS: {
      const { token, user } = action.payload;

      return {
        ...state,
        error: false,
        fetching: false,
        token: token,
        currentUser: user,
      };
    }
    case userTypes.LOAD_CALL_RECORD_FAILURE:
    case userTypes.DELETE_AUTO_DIALER_FAILURE:
    case userTypes.UPDATE_AUTO_DIALER_FAILURE:
    case userTypes.CREATE_AUTO_DIALER_FAILURE:
    case userTypes.LOAD_AUTO_DIALER_FAILURE:
    case userTypes.DELETE_CONTACT_FAILURE:
    case userTypes.UPDATE_CONTACT_FAILURE:
    case userTypes.CREATE_CONTACT_FAILURE:
    case userTypes.DELETE_PHONE_BOOK_FAILURE:
    case userTypes.UPDATE_PHONE_BOOK_FAILURE:
    case userTypes.CREATE_PHONE_BOOK_FAILURE:
    case userTypes.LOAD_CONTACT_FAILURE:
    case userTypes.LOAD_PHONE_BOOK_FAILURE:
    case userTypes.SIGN_UP_FAILURE:
    case userTypes.SIGN_IN_FAILURE: {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case userTypes.LOAD_CALL_RECORD_SUCCESS: {
      return {
        ...state,
        error: false,
        fetching: false,
        callRecord: action.payload,
      };
    }
    case userTypes.DELETE_AUTO_DIALER_SUCCESS: {
      const updatedAutoDialerList = state.autoDialer.filter(
        (dialer) => dialer.id !== action.payload
      );
      return {
        ...state,
        error: false,
        fetching: false,
        autoDialer: updatedAutoDialerList,
      };
    }
    case userTypes.UPDATE_AUTO_DIALER_SUCCESS: {
      const updatedAutoDialerList = state.autoDialer.map((dialer) =>
        dialer.id === action.payload.id ? action.payload : dialer
      );
      return {
        ...state,
        fetching: false,
        error: false,
        autoDialer: updatedAutoDialerList,
      };
    }
    case userTypes.CREATE_AUTO_DIALER_SUCCESS: {
      return {
        ...state,
        fetching: false,
        error: false,
        autoDialer: [...state.autoDialer, action.payload],
      };
    }
    case userTypes.LOAD_AUTO_DIALER_SUCCESS: {
      return {
        ...state,
        error: false,
        fetching: false,
        autoDialer: action.payload,
      };
    }
    case userTypes.DELETE_CONTACT_SUCCESS: {
      const updatedContactList = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return {
        ...state,
        error: false,
        fetching: false,
        contacts: updatedContactList,
      };
    }
    case userTypes.UPDATE_CONTACT_SUCCESS: {
      const updatedContactList =
        state.contacts === null
          ? [action.payload]
          : state.contacts.map((contact) =>
              contact.id === action.payload.id ? action.payload : contact
            );
      return {
        ...state,
        error: false,
        fetching: false,
        contacts: updatedContactList,
      };
    }
    case userTypes.CREATE_CONTACT_SUCCESS: {
      return {
        ...state,
        error: false,
        fetching: false,
        contacts: [...state.contacts, action.payload],
      };
    }
    case userTypes.DELETE_PHONE_BOOK_SUCCESS: {
      const updatedPhoneBookList = state.phoneBooks.filter(
        (book) => book.id !== action.payload
      );
      return {
        ...state,
        fetching: false,
        error: false,
        phoneBooks: updatedPhoneBookList,
      };
    }
    case userTypes.UPDATE_PHONE_BOOK_SUCCESS: {
      const updatedPhoneBookList = state.phoneBooks.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
      return {
        ...state,
        fetching: false,
        error: false,
        phoneBooks: updatedPhoneBookList,
      };
    }
    case userTypes.CREATE_PHONE_BOOK_SUCCESS: {
      return {
        ...state,
        fetching: false,
        error: false,
        phoneBooks: [...state.phoneBooks, action.payload],
      };
    }
    case userTypes.LOAD_PHONE_BOOK_SUCCESS: {
      return {
        ...state,
        phoneBooks: action.payload,
        fetching: false,
        error: false,
      };
    }
    case userTypes.LOAD_CONTACT_SUCCESS: {
      return {
        ...state,
        error: false,
        fetching: false,
        contacts: action.payload,
      };
    }
    case userTypes.SIGN_OUT: {
      return {
        ...state,
        token: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
