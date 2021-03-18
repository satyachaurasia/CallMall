import React, { useState, useEffect } from "react";
import styles from "./PhoneBookDetail.module.css";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPhoneBooks, selectToken } from "../../states/user/user.selector";

import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import {
  loadPhoneBookStart,
  updateContactStart,
} from "../../states/user/user.action";

const PhoneBookDetail = ({
  tabId,
  token,
  phoneBooks,
  updateContactStart,
  loadPhoneBookStart,
}) => {
  const [currentPhoneBook, setCurrentPhoneBook] = useState(null);
  useEffect(() => {
    if (phoneBooks !== null && tabId) {
      const temp = phoneBooks.find((book) => book.id == tabId);

      temp && setCurrentPhoneBook((prev) => temp);
    }
  }, [tabId, phoneBooks]);

  const handleRemove = async (contact) => {
    if (
      window.confirm(
        "Do you really want to remove this contact from Phone Book?"
      )
    ) {
      const { phone_books, ...restData } = contact;
      const newPhoneBooks = phone_books.filter(
        (book) => book !== currentPhoneBook.id
      );
      try {
        await updateContactStart(token, contact.id, {
          phone_books: newPhoneBooks,
        });
        await loadPhoneBookStart(token);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.PhoneBookLogo}>
          <ContactPhoneIcon style={{ color: "#009688", fontSize: "4rem" }} />
        </div>
        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            {currentPhoneBook?.title} Phone Book
          </span>
          <br></br>
          <span>List of all Contacts</span>
        </div>
      </div>
      <div className={styles.mainContent}>
        {currentPhoneBook !== null && (
          <>
            <div className={styles.tableDiv}>
              <table className={styles.tableStyle}>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPhoneBook?.contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.first_name}</td>
                      <td>{contact.last_name}</td>
                      <td>{contact.city}</td>
                      <td>{contact.number}</td>
                      <td>
                        <IconButton>
                          <EditIcon style={{ color: "#009688" }} />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(contact)}>
                          <RemoveCircleIcon style={{ color: "#009688" }} />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  phoneBooks: selectPhoneBooks,
});

const mapDispatchToProps = (dispatch) => ({
  updateContactStart: (token, contactId, updates) =>
    dispatch(updateContactStart(token, contactId, updates)),
  loadPhoneBookStart: (token) => dispatch(loadPhoneBookStart(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBookDetail);
