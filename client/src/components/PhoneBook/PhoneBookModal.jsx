import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectToken } from "../../states/user/user.selector";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import styles from "./PhoneBookModal.module.css";
import {
  createPhoneBookStart,
  updatePhoneBookStart,
} from "../../states/user/user.action";

const PhoneBookModal = ({
  open,
  setOpen,
  editObject,
  setEditObject,
  token,
  createPhoneBookStart,
  updatePhoneBookStart,
}) => {
  const initialState = {
    title: "",
    description: "",
  };

  const [phoneBookForm, setPhoneBookForm] = useState(initialState);

  useEffect(() => {
    if (editObject) {
      setPhoneBookForm((prev) => editObject);
    }
  }, [editObject]);

  const handleClose = () => {
    setOpen((prev) => false);
    setPhoneBookForm((prev) => initialState);
    setEditObject(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPhoneBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editObject) {
        await updatePhoneBookStart(token, editObject.id, phoneBookForm);
      } else {
        await createPhoneBookStart(token, phoneBookForm);
      }
    } catch (err) {
      alert(err.message);
    }

    handleClose();
  };

  return ReactDOM.createPortal(
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle id="form-dialog-title">
        {editObject ? "Update Phone Book" : "Add Phone Book"}
      </DialogTitle>
      <DialogContent>
        <form className={styles.loginFormStyle} onSubmit={handleSubmit}>
          <input
            className={styles.formInput}
            type="text"
            name="title"
            onChange={handleChange}
            value={phoneBookForm.title}
            required
            placeholder="Title*"
          />
          <textarea
            className={styles.formInput}
            rows="4"
            cols="50"
            name="description"
            onChange={handleChange}
            value={phoneBookForm.description}
            placeholder="Description"
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
});

const mapDispatchToProps = (dispatch) => ({
  createPhoneBookStart: (token, data) =>
    dispatch(createPhoneBookStart(token, data)),
  updatePhoneBookStart: (token, phoneBookId, data) =>
    dispatch(updatePhoneBookStart(token, phoneBookId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBookModal);
