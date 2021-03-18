import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToken } from "../../states/user/user.selector";

import styles from "./index.module.css";
import phone from "../../assets/sample.png";
import { signOut } from "../../states/user/user.action";
import { NavLink, withRouter } from "react-router-dom";

const index = ({ token, signOut, location, history, ...restProps }) => {
  const handleBtnClick = (event) => {
    event.preventDefault();
    signOut();
    history.push("/login");
  };

  return (
    <div className={styles.navBarContainer}>
      <header className={styles.head}>
        <div className={styles.toolBar}>
          <div className={styles.LogoDiv}>
            <img src={phone} className={styles.logo} alt="logo" />
            <span className={styles.spanLogo}>Call Mall</span>
          </div>

          {token && (
            <div className={styles.btnDiv}>
              <NavLink to="/call-record">
                <button className={styles.logOutBtn}>Call Record</button>
              </NavLink>
              <NavLink to="/dialer">
                <button className={styles.logOutBtn}>Auto Dialer</button>
              </NavLink>
              <NavLink to="/contacts">
                <button className={styles.logOutBtn}>Contact List</button>
              </NavLink>
              <NavLink to="/">
                <button className={styles.logOutBtn}>Phone Books</button>
              </NavLink>
              <button className={styles.logOutBtn} onClick={handleBtnClick}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(index));
