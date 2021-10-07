import React, { Fragment, useState } from "react";
import classes from "./Styles/signup.module.css";
import { connect } from "react-redux";
import { setlogintoken, setloginprofile } from "../../Actions/auth";
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "../Layouts/Spinner";
import Error from "./Error";
import { useHistory, Redirect } from "react-router-dom";
const Login = (props) => {
  const history = useHistory();
  const [err, seterr] = useState([]);
  const [loading, setloading] = useState(false);
  const [userdetails, setdetails] = useState({
    email: "",
    password: "",
  });
  const profile = localStorage.getItem("profile");
  if (
    localStorage.getItem("isAuthenticated") === "true" ||
    props.details.isAuthenticated === true
  ) {
    return <Redirect to="/dashboard" />;
  }
  const onchange = (e) => {
    setdetails({ ...userdetails, [e.target.name]: e.target.value });
  };
  const { email, password } = userdetails;
  const onsubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const errors = [];
    if (email.length === 0) {
      errors.push("Please enter an email");
    }
    if (password.length === 0) {
      errors.push("Please enter a password");
    }
    if (errors.length > 0) {
      seterr(errors);
      setloading(false);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);
        const res = await axios.post(
          "/api/v1/users/login",

          formdata,
          config
        );
        await props.setloginprofile(res.data.token);
        await props.setlogintoken(res.data.token);

        history.push("/dashboard");
      } catch (error) {
        console.log(error.response.data);
        seterr(error.response.data.data);
        setloading(false);
      }
    }
  };
  if (loading === false) {
    return (
      <Fragment>
        <div className={classes["all"]}>
          <form className={classes["form"]}>
            <h3>LOGIN</h3>
            <input
              className={classes["input"]}
              type="text"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => onchange(e)}
            />
            <input
              className={classes["input"]}
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => onchange(e)}
            />
            <button onClick={(e) => onsubmit(e)} className={classes["subbtn"]}>
              Login
            </button>
          </form>
        </div>
        {err.map((err) => (
          <Error msg={err} />
        ))}
        <br />
        <br />
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};
const mapStateToProps = (state) => ({
  details: state.auth,
});
Login.propTypes = {
  setlogintoken: PropTypes.func.isRequired,
  setloginprofile: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { setlogintoken, setloginprofile })(
  Login
);
