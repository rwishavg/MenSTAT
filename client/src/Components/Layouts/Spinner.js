import React from "react";
import spinner from "../../assets/spinner.gif";

export default () => {
  return (
    <div style={{ height: "100vh" }}>
      <img
        src={spinner}
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          marginTop: "200px",
          display: "block",
          backgroundColor: "whitesmoke",
        }}
        alt="Loading..."
      />
    </div>
  );
};
