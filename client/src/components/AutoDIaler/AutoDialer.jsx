import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAutoDialer, selectToken } from "../../states/user/user.selector";

import styles from "./AutoDialer.module.css";
import DialpadIcon from "@material-ui/icons/Dialpad";
import {
  deleteAutoDialerStart,
  loadAutoDialerStart,
} from "../../states/user/user.action";

import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import AutoDialerModal from "./AutoDialerModal";

const AutoDialer = ({
  autoDialer,
  loadAutoDialerStart,
  deleteAutoDialerStart,
  token,
  ...restProps
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [editObject, setEditObject] = useState(null);

  useEffect(() => {
    autoDialer === null && loadAutoDialerStart(token);
  }, []);

  const handleEdit = (dialer) => {
    setOpenModal((prev) => true);
    setEditObject((prev) => dialer);
  };

  const handleDelete = async (dialer) => {
    if (window.confirm("Do you really want to delete this?")) {
      try {
        await deleteAutoDialerStart(token, dialer.id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className={styles.phoneBookContainer}>
      <div className={styles.banner}>
        <DialpadIcon
          style={{ color: "#009688", fontSize: "2.5rem", marginRight: ".5rem" }}
        />
        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            All Auto Dialer
          </span>
          <br></br>
          <span>List of all Auto Dialer</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <button
          className={styles.addBtn}
          onClick={() => setOpenModal((prev) => true)}
        >
          + Add Auto Dialer
        </button>

        <div className={styles.tableDiv}>
          <table className={styles.tableStyle}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Book</th>
                <th>Message</th>
                <th>Start Date & Time</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {autoDialer !== null &&
                autoDialer.map((dialer) => (
                  <tr key={dialer.id}>
                    <td>{dialer.name}</td>
                    <td>{dialer.phone_book_name}</td>
                    <td>{dialer.message}</td>
                    <td>
                      {moment(dialer.start_date_time).format(
                        "DD MMM, YYYY hh:mm"
                      )}
                    </td>
                    <td>{dialer.status}</td>
                    <td>
                      <IconButton
                        disabled={dialer.status === "completed" ? true : false}
                        onClick={() => handleEdit(dialer)}
                      >
                        <EditIcon
                          style={{
                            color:
                              dialer.status === "completed" ? "" : "#009688",
                          }}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(dialer)}>
                        <DeleteIcon style={{ color: "#009688" }} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AutoDialerModal
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
  autoDialer: selectAutoDialer,
});

const mapDispatchToProps = (dispatch) => ({
  loadAutoDialerStart: (token) => dispatch(loadAutoDialerStart(token)),
  deleteAutoDialerStart: (token, dialerId) =>
    dispatch(deleteAutoDialerStart(token, dialerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AutoDialer);
