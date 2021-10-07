import React, { Fragment } from "react";
import classes from "./footer.module.css";
export default function Footer() {
  return (
    <Fragment>
      <hr />
      <div className={classes["footer"]}>
        <div className={classes["items"]}>
          <h2 className={classes["head"]}>Mental Statistics</h2>
          <ul className={classes["list"]}>
            <li>API</li>
            <li>Bugs</li>
            <li>Contribute</li>
          </ul>
        </div>
        <div className={classes["items"]}>
          <h2 className={classes["head"]}>Rwishav Ghosh</h2>
          <ul className={classes["list"]}>
            <li>
              <i class="fas fa-phone"></i> +91-89109 94842
            </li>
            <li>
              <i class="fas fa-envelope-square"></i> grwishav34@gmail.com
            </li>
            <li>
              <i class="fas fa-blog"></i>
              <a className={classes["aa"]}
                href="https://aadityapal.netlify.app">
                {" "}
                https://aadityapal.netlify.app/
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
