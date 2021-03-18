import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import phone from "../../assets/sample.png";
import { signInStart } from "../../states/user/user.action";
import { selectFetching, selectToken } from "../../states/user/user.selector";

import styles from "./Login.module.css";

const Login = ({ token, fetching, history, signInStart }) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    token && history.push("signup/");
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = loginForm;
    try {
      await signInStart(username, password);
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
            value={loginForm.username}
            required
            placeholder="Username"
          />

          <input
            className={styles.formInput}
            type="password"
            name="password"
            onChange={handleChange}
            value={loginForm.password}
            required
            placeholder="Password"
          />
          <button type="submit" className={styles.btnStyle}>
            Log In
          </button>
          <span style={{ textAlign: "center" }}>
            New User?{" "}
            <NavLink
              to="signup"
              style={{
                textDecoration: "None",
                color: "#009688",
                fontWeight: "700",
              }}
            >
              Signup
            </NavLink>{" "}
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
  signInStart: (username, password) =>
    dispatch(signInStart(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
