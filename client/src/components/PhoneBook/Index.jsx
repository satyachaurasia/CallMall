import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPhoneBooks, selectToken } from "../../states/user/user.selector";
import {
  deletePhoneBookStart,
  loadPhoneBookStart,
} from "../../states/user/user.action";
import PhoneBookModal from "./PhoneBookModal";

import EditIcon from "@material-ui/icons/Edit";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NavLink, useLocation } from "react-router-dom";
import PhoneBookDetail from "./PhoneBookDetail";

const Index = ({
  token,
  phoneBooks,
  loadPhoneBookStart,
  deletePhoneBookStart,
}) => {
  useEffect(() => {
    phoneBooks === null && loadPhoneBookStart(token);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [editObject, setEditObject] = useState(null);

  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();

  const tabId = query.get("id");

  const handleEdit = (book) => {
    setEditObject((prev) => book);
    setOpenModal(true);
  };

  const handleDelete = async (book) => {
    if (window.confirm("Do you really want to delete this?")) {
      try {
        await deletePhoneBookStart(token, book.id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className={styles.phoneBookContainer}>
      {tabId ? (
        <PhoneBookDetail tabId={tabId} />
      ) : (
        <>
          <div className={styles.banner}>
            <ContactPhoneIcon
              style={{
                color: "#009688",
                fontSize: "3rem",
                marginRight: ".5rem",
              }}
            />
            <div>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                }}
              >
                All Phone Book
              </span>
              <br></br>
              <span>List of all created Phone Book</span>
            </div>
          </div>

          <div className={styles.mainContent}>
            <button
              className={styles.addBtn}
              onClick={() => setOpenModal(true)}
            >
              + Add Phone Book
            </button>

            <div className={styles.tableDiv}>
              <table className={styles.tableStyle}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {phoneBooks !== null &&
                    phoneBooks.map((book) => (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.description ? book.description : "-"}</td>
                        <td>
                          <NavLink
                            to={`?id=${book.id}`}
                            activeStyle={{ textDecoration: "none" }}
                          >
                            <IconButton>
                              <VisibilityIcon style={{ color: "#009688" }} />
                            </IconButton>
                          </NavLink>
                          <IconButton onClick={() => handleEdit(book)}>
                            <EditIcon style={{ color: "#009688" }} />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(book)}>
                            <DeleteIcon style={{ color: "#009688" }} />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <PhoneBookModal
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
  phoneBooks: selectPhoneBooks,
});

const mapDispatchToProps = (dispatch) => ({
  loadPhoneBookStart: (token) => dispatch(loadPhoneBookStart(token)),
  deletePhoneBookStart: (token, phoneBookId) =>
    dispatch(deletePhoneBookStart(token, phoneBookId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
