/*
 * @file: index.js
 * @description: Main route
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./utilities/StringEn";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
