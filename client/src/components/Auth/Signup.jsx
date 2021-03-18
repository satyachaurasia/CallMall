import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import phone from "../../assets/sample.png";
import { signupStart } from "../../states/user/user.action";
import { selectFetching, selectToken } from "../../states/user/user.selector";

import styles from "./Signup.module.css";

const Signup = ({ token, fetching, history, signupStart }) => {
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  useEffect(() => {
    token && history.push("/");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signupStart(signupForm);
      history.push("/");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <img src={phone} className={styles.logo} alt="logo" />
        <form onSubmit={handleSubmit} className={styles.loginFormStyle}>
          <input
            className={styles.formInput}
            type="text"
            name="username"
            onChange={handleChange}
            value={signupForm.username}
            required
            placeholder="Username*"
          />

          <input
            className={styles.formInput}
            type="text"
            name="firstName"
            onChange={handleChange}
            value={signupForm.firstName}
            placeholder="First Name"
          />

          <input
            className={styles.formInput}
            type="text"
            name="lastName"
            onChange={handleChange}
            value={signupForm.lastName}
            placeholder="Last Name"
          />

          <input
            className={styles.formInput}
            type="text"
            name="email"
            onChange={handleChange}
            value={signupForm.email}
            placeholder="Email"
          />

          <input
            className={styles.formInput}
            type="password"
            name="password"
            onChange={handleChange}
            value={signupForm.password}
            required
            placeholder="Password*"
          />
          <button type="submit" className={styles.btnStyle} disabled={fetching}>
            Sign Up
          </button>
          <span style={{ textAlign: "center" }}>
            Existing User?{" "}
            <NavLink
              to="login"
              style={{
                textDecoration: "None",
                color: "#009688",
                fontWeight: "700",
              }}
            >
              Login
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  fetching: selectFetching,
});

const mapDispatchToProps = (dispatch) => ({
  signupStart: (data) => dispatch(signupStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
