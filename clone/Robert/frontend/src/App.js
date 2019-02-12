/*
 * @file: App.js
 * @description: Application
 * @date: 01.06.2018
 * @author: Manish Budhiraja
 */

import React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider, connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import Routes from "./config/routes";
import Loader from "./components/Loader";
import configureStore from "./config/configureStore";

const history = createHistory();
const { persistor, store } = configureStore(history);

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Routes {...store} />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
