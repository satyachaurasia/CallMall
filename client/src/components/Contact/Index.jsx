import React, { useState, useEffect } from "react";
import styles from "./Index.module.css";
import contactLogo from "../../assets/contact.png";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectContacts, selectToken } from "../../states/user/user.selector";

import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteContactStart,
  loadContactStart,
  loadPhoneBookStart,
} from "../../states/user/user.action";
import ContactModal from "./ContactModal";

const Index = ({
  token,
  contacts,
  loadContactStart,
  deleteContactStart,
  loadPhoneBookStart,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const [editObject, setEditObject] = useState(null);

  useEffect(() => {
    const loadContactAsync = async () => {
      if (contacts === null) {
        try {
          await loadContactStart(token);
        } catch (err) {
          alert(err.message);
        }
      }
    };
    loadContactAsync();
  }, []);

  const handleEdit = (contact) => {
    setEditObject((prev) => contact);
    setOpenModal(true);
  };

  const handleDelete = async (contact) => {
    if (window.confirm("Do you really want to delete this?")) {
      try {
        await deleteContactStart(token, contact.id);
        await loadPhoneBookStart(token);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className={styles.phoneBookContainer}>
      <div className={styles.banner}>
        <img src={contactLogo} className={styles.PhoneBookLogo} />
        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            All Contacts
          </span>
          <br></br>
          <span>List of all Contacts</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <button
          className={styles.addBtn}
          onClick={() => setOpenModal((prev) => true)}
        >
          + Add Contact
        </button>

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
              {contacts !== null &&
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.first_name}</td>
                    <td>{contact.last_name}</td>
                    <td>{contact.city}</td>
                    <td>{contact.number}</td>
                    <td>
                      <IconButton onClick={() => handleEdit(contact)}>
                        <EditIcon style={{ color: "#009688" }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(contact)}>
                        <DeleteIcon style={{ color: "#009688" }} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ContactModal
        open={openModal}
        setOpen={setOpenModal}
        editObject={editObject}
        setEditObject={setEditObject}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  contacts: selectContacts,
});

const mapDispatchToProps = (dispatch) => ({
  loadPhoneBookStart: (token) => dispatch(loadPhoneBookStart(token)),
  loadContactStart: (token) => dispatch(loadContactStart(token)),
  deleteContactStart: (token, contactId) =>
    dispatch(deleteContactStart(token, contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
