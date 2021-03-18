import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectPhoneBooks, selectToken } from "../../states/user/user.selector";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import styles from "./AutoDialerModal.module.css";
import {
  createAutoDialerStart,
  updateAutoDialerStart,
  loadPhoneBookStart,
} from "../../states/user/user.action";

const AutoDialerModal = ({
  open,
  setOpen,
  editObject,
  setEditObject,
  token,
  loadPhoneBookStart,
  phoneBook,
  createAutoDialerStart,
  updateAutoDialerStart,
}) => {
  const initialState = {
    name: "",
    message: "",
    start_date_time: "",
    phone_book: "",
  };

  useEffect(() => {
    phoneBook === null && loadPhoneBookStart(token);
  }, []);

  const [autoDialerForm, setAutoDialerForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAutoDialerForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (editObject) {
      setAutoDialerForm((prev) => ({
        ...editObject,
        start_date_time: editObject.start_date_time.substring(0, 16),
      }));
    }
  }, [editObject]);

  useEffect(() => {
    console.log(autoDialerForm);
  }, [autoDialerForm]);

  const handleClose = () => {
    setOpen((prev) => false);
    setAutoDialerForm((prev) => initialState);
    setEditObject((prev) => null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editObject) {
        await updateAutoDialerStart(token, editObject.id, autoDialerForm);
      } else {
        await createAutoDialerStart(token, autoDialerForm);
      }
    } catch (err) {
      alert(err.message);
    }
    handleClose();
  };

  return ReactDOM.createPortal(
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle id="form-dialog-title">
        {editObject ? "Update Auto Dialer" : "Add Auto Dialer"}
      </DialogTitle>
      <DialogContent>
        <form className={styles.loginFormStyle} onSubmit={handleSubmit}>
          <input
            className={styles.formInput}
            type="text"
            name="name"
            onChange={handleChange}
            value={autoDialerForm.name}
            required
            placeholder="Title*"
          />
          <div>
            <textarea
              className={styles.formInput}
              rows="4"
              cols="50"
              name="message"
              onChange={handleChange}
              value={autoDialerForm.message}
              placeholder="Message* (from text to voice)"
              required
            />
            <span>Use #firstName, #lastName, #city for personalization</span>
          </div>

          <input
            type="datetime-local"
            className={styles.formInput}
            name="start_date_time"
            value={autoDialerForm.start_date_time}
            onChange={handleChange}
            required
          />
          <select
            className={styles.formInput}
            name="phone_book"
            required
            value={autoDialerForm.phone_book}
            onChange={handleChange}
          >
            <option value="" disabled>
              Choose a Phone Book
            </option>
            {phoneBook !== null &&
              phoneBook.map((book) => {
                return (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                );
              })}
          </select>
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
  phoneBook: selectPhoneBooks,
});

const mapDispatchToProps = (dispatch) => ({
  loadPhoneBookStart: (token) => dispatch(loadPhoneBookStart(token)),
  createAutoDialerStart: (token, data) =>
    dispatch(createAutoDialerStart(token, data)),
  updateAutoDialerStart: (token, dialerId, updates) =>
    dispatch(updateAutoDialerStart(token, dialerId, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoDialerModal);
