import React from "react";
import { Fragment } from "react";
import classes from "./Styles/progressive.module.css";
export default function Progressive(props) {
  const step = [];
  const done = [];
  for (let i = 0; i < props.n; i++) {
    step[i] = classes["done"];
    done[i] = classes["back"];
  }

  return <Fragment></Fragment>;
}
