import React, {useEffect,useState,Fragment } from "react";
import classes from "./Styles/signup.module.css";
import Progressive from "./Progressive";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';
import Spinner from '../Layouts/Spinner';
import{useHistory} from 'react-router-dom';
import { setusertoken } from "../../Actions/auth.js";
import {finalregister} from '../../Actions/signin';
const Token = (props) => {
  const history = useHistory();
  const [token, setToken] = useState(props.details.vtoken);
  const [err,seterr] = useState([]);
  const [loading,setLoading] = useState(false);
  if(props.details.firstname.length==0||props.details.password.length==0||props.details.email.length==0){
    return <Redirect to="/signup"/>
  }
  const onchange = (e) => {
    seterr([]);
    setToken(e.target.value)
  }
  const onclick = async (e) => {
    setLoading(true);
    e.preventDefault();
    const errors = [];
    if(token.length == 0){
      errors.push('Please enter a valid token');
      seterr(errors);
      setLoading(false);
      return;
    }
    try {
          const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };
          const data = {
            email: props.details.email,
            token: token
          };
          const res = await axios.post(
            "/api/v1/users/emailverification",
            data,
            config
          );
          await props.finalregister(token);
          await props.setusertoken(res.data.data);
          history.push('/initialprofile')
         
    } catch (error) {
        errors.push(error.response.data.data);
        seterr(errors);
        setLoading(false);
        return;
    }
  }
  const tokn  = token;
  if(loading==false){
  return (
    <Fragment>
      <div className={"container d-flex" + " " + classes["all"]}>
        <form className={classes["form"]}>
          <h3>Verify email</h3>
          <input
            className={classes["input"]}
            type="email"
            placeholder="Enter code sent in email"
            value={tokn}
            onChange= {e =>onchange(e)}
          />
          <button onClick = {e =>onclick(e)}className={classes["subbtn"]}>Next</button>
        </form>
      </div>
      <br />
      <br />
      {err.map(err => <Error msg={err}/>)}
      <Progressive n={4} />
    </Fragment>
  );
  }
  else{
    return <Spinner/>
  }
};

Token.propTypes = {
  details: PropTypes.object.isRequired,
  setusertoken:PropTypes.func.isRequired,
  finalregister:PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  details:state.signin
})
export default connect(mapStateToProps,{setusertoken,finalregister})(Token);
