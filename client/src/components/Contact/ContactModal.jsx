import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectPhoneBooks, selectToken } from "../../states/user/user.selector";

import Select from "react-select";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import styles from "./ContactModal.module.css";
import {
  createContactStart,
  loadPhoneBookStart,
  updateContactStart,
} from "../../states/user/user.action";

const ContactModal = ({
  open,
  setOpen,
  editObject,
  setEditObject,
  token,
  phoneBooks,
  loadPhoneBookStart,
  createContactStart,
  updateContactStart,
}) => {
  const initialState = {
    first_name: "",
    last_name: "",
    city: "",
    number: "",
    phone_books: [],
  };

  const [contactForm, setContactForm] = useState(initialState);

  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    phoneBooks === null && loadPhoneBookStart(token);
  }, []);

  useEffect(() => {
    if (phoneBooks) {
      const tempOptions = phoneBooks.map((book) => ({
        value: book.id,
        label: book.title,
      }));

      setSelectOptions((prev) => tempOptions);
    }
  }, [phoneBooks]);

  useEffect(() => {
    if (editObject) {
      setContactForm((prev) => editObject);
    }
  }, [editObject]);

  const handleClose = () => {
    setOpen((prev) => false);
    setContactForm((prev) => initialState);
    setEditObject(null);
    setSelectError((prev) => false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (contactForm.phone_books.length === 0) {
      setSelectError((prev) => true);
    } else {
      setSelectError((prev) => false);
      try {
        if (editObject) {
          await updateContactStart(token, editObject.id, contactForm);
          await loadPhoneBookStart(token);
        } else {
          await createContactStart(token, contactForm);
          await loadPhoneBookStart(token);
        }
      } catch (err) {
        alert(err.message);
      }

      handleClose();
    }
  };

  const changeSelect = (event) => {
    setContactForm((prev) => ({
      ...prev,
      phone_books: event ? event.map((x) => x.value) : [],
    }));
  };

  const [selectError, setSelectError] = useState(false);

  return ReactDOM.createPortal(
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle id="form-dialog-title">
        {editObject ? "Update Contact" : "Add Contact"}
      </DialogTitle>
      <DialogContent>
        <form className={styles.loginFormStyle} onSubmit={handleSubmit}>
          <input
            className={styles.formInput}
            type="text"
            name="first_name"
            onChange={handleChange}
            value={contactForm.first_name}
            required
            placeholder="First Name*"
          />
          <input
            className={styles.formInput}
            type="text"
            name="last_name"
            onChange={handleChange}
            value={contactForm.last_name}
            required
            placeholder="Last Name*"
          />
          <input
            className={styles.formInput}
            type="text"
            pattern="^\+[1-9]{1}[0-9]{3,14}$"
            title="Phone number with +91 and remaining 10 digit with 0-9"
            name="number"
            onChange={handleChange}
            value={contactForm.number}
            required
            placeholder="Phone Number* Eg. +919983138413"
          />
          <div>
            <Select
              isMulti
              name="colors"
              options={selectOptions}
              value={selectOptions.filter((item) =>
                contactForm.phone_books.includes(item.value)
              )}
              onChange={changeSelect}
              className="basic-multi-select"
              classNamePrefix="select"
              required
            />
            {selectError && <span style={{ color: "red" }}>Required</span>}
          </div>
          <input
            className={styles.formInput}
            type="text"
            name="city"
            onChange={handleChange}
            value={contactForm.city}
            required
            placeholder="City*"
          />
          <div style={{ display: "flex", gap: "1.5em" }}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.btnStyle}>
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>,
    document.getElementById("portal-root")
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  phoneBooks: selectPhoneBooks,
});

const mapDispatchToProps = (dispatch) => ({
  loadPhoneBookStart: (token) => dispatch(loadPhoneBookStart(token)),
  createContactStart: (token, data) =>
    dispatch(createContactStart(token, data)),
  updateContactStart: (token, contactId, data) =>
    dispatch(updateContactStart(token, contactId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactModal);
