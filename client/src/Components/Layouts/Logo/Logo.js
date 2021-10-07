import React from "react";
import Animation from "./../../../assets/blocks_animations.svg";
import classes from "./Logo.module.css";

function Logo() {
  return (
    <object
      className={classes["svg"]}
      type="image/svg+xml"
      data={Animation}
    ></object>
  );
}
export default Logo;
