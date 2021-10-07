import React, { useState, useEffect } from "react";
import classes from "./navbar.module.css";
import { connect } from "react-redux";
import { logout } from "../../../Actions/auth";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import def from "../../../assets/profilephoto.svg";
const Navbar = (props) => {
  const history = useHistory();
  const [navbtn, setnavbtn] = useState(false);
  const [photo, setphoto] = useState("");
  let navprofile;
  if (typeof props.details.profile === "string") {
    navprofile = JSON.parse(props.details.profile);
  } else {
    navprofile = props.details.profile;
  }
  useEffect(() => {
    if (navprofile != null && navprofile.profileimagetext != null) {
      setphoto("/images/" + navprofile.profileimagetext);
    } else {
      setphoto(def);
    }
  }, [navprofile]);
  const usrlogout = (e) => {
    props.logout();
  };
  let btn;
  const onclick = () => {
    if (navbtn === false) {
      setnavbtn(true);
      document.getElementById("navitem").style.display = "inline-block";
    } else {
      setnavbtn(false);
      document.getElementById("navitem").style.display = "none";
    }
  };
  if (navbtn === false) {
    btn = (
      <div className={classes["button"]} onClick={onclick}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    btn = (
      <div className={classes["button1"]} onClick={onclick}>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className={classes["navbar"]}>
      <img
        className={classes["logo"]}
        alt="Profilephoto"
        src={require("../../../assets/SMITDevBlock_logo.svg")}
      />
      <div id="navitem" className={classes["items"]}>
        <ul>
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to="/explore">
            <li>Explore</li>
          </Link>

          <Link to="/userprofile">
            <li>Profile</li>
          </Link>
          <Link to="/currentuserposts">
            <li>My posts</li>
          </Link>
          <li>
            <Link to="/">
              {" "}
              <button
                className={classes["logout"]}
                onClick={(e) => usrlogout(e)}
              >
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <img className={classes["profilephoto"]} src={photo} />
      {btn}
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  details: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
