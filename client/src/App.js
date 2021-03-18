import React from "react";

import "./App.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import PhoneBook from "./components/PhoneBook/Index";
import Contact from "./components/Contact/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  selectCurrentUser,
  selectFetching,
  selectToken,
} from "./states/user/user.selector";
import AutoDialer from "./components/AutoDIaler/AutoDialer";
import CallRecord from "./components/CallRecord/CallRecord";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App({ fetching, ...restProps }) {
  const classes = useStyles();
  return (
    <div className="App">
      <BrowserRouter>
        <Backdrop className={classes.backdrop} open={fetching}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <NavBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/" component={PhoneBook} />
          <ProtectedRoute exact path="/contacts" component={Contact} />
          <ProtectedRoute exact path="/dialer" component={AutoDialer} />
          <ProtectedRoute exact path="/call-record" component={CallRecord} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  currentUser: selectCurrentUser,
  fetching: selectFetching,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
