/*
 * @file: Loader.js
 * @description: App Loader
 */

import React from "react";
import ReactLoader from "react-loaders";

export default ({ loading = true }) => {
  return (
    loading && (
      <div>
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: "10",
            top: 0,
            left: 0,
            paddingTop: "50vh",
            paddingLeft: "50vw",
            backgroundColor: "rgba(0, 0, 0, 0.7)"
          }}
        >
          <ReactLoader type="pacman" active={true} />
        </div>
      </div>
    )
  );
};
