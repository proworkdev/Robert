import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginScreen from "../containers/Login";
import Dashboard from "../containers/Dashboard";

const Routers = store => {
  const state = store.getState();

  /*********** Check authentications ***********/

  return !state.user.isLoggedIn ? (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={history => {
            return (
              <LoginScreen history={history.history} match={history.match} />
            );
          }}
        />
        <Route
          exact
          path="/dashboard"
          render={history => {
            window.location.href = "/login";
          }}
        />
        <Route
          exact
          path="/login"
          render={history => {
            return (
              <LoginScreen history={history.history} match={history.match} />
            );
          }}
        />
      </Switch>
    </div>
  ) : (
    <div>
      <Switch>
        <Route
          exact
          path="/dashboard"
          render={history => {
            return (
              <Dashboard history={history.history} match={history.match} />
            );
          }}
        />
        <Route
          exact
          path="/login"
          render={history => {
            window.location.href = "/dashboard";
          }}
        />
        <Route
          exact
          path="/"
          render={history => {
            window.location.href = "/dashboard";
          }}
        />
        <Route
          exact
          path=""
          render={history => {
            window.location.href = "/dashboard";
          }}
        />
      </Switch>
    </div>
  );
};

export default Routers;
