import React, { useState,Fragment } from "react";
import classes from "./Styles/signup.module.css";
import Progressive from "./Progressive";
import {useHistory,Redirect} from 'react-router-dom'
import Error from './Error';
import {connect} from 'react-redux';
import {enterpassword} from '../../Actions/signin';
import PropTypes from 'prop-types';
const Enterpassword = (props) => {

  const [details,setdetails] = useState({
    pass1:props.details.password,
    pass2:""
  });
  const [err,seterr] = useState([]);
  const{pass1,pass2} = details;
const history = useHistory();
    if (
      props.details.firstname.length == 0 ||
      props.details.lastname.length == 0
    ) {
      return <Redirect to="/signup" />;
    } 
const onchange = (e) => {
setdetails({...details,[e.target.name]:e.target.value})
}
const submit = (e) => {
  e.preventDefault();
  const err = [];
  if(pass1.length==0){
    err.push('Please enter a password');
  }
  else if(pass1.length < 6){
    err.push("Please enter a password greater than 6 characters")
  }
  if(pass1!=pass2){
    err.push('Password do not match');
  }
  seterr(err);
  if(err.length == 0){
    props.enterpassword(pass1);
    history.push('/enteremail')
  }
}
  return (
    <Fragment>
      <div className={"container d-flex" + " " + classes["all"]}>
        <form className={classes["form"]}>
          <h3>Enter password</h3>
          <input
            className={classes["input"]}
            type="password"
            name="pass1"
            value={pass1}
            placeholder="Enter password (min:6 characters)"
            onChange={onchange}
          />
          <input
            className={classes["input"]}
            type="password"
            name="pass2"
            value={pass2}
            placeholder="Re-enter password"
            onChange={onchange}
          />
            <button onClick = {(e) => submit(e)}className={classes["subbtn"]}>Next</button>
        </form>
      </div>
      {err.map(err => <Error msg = {err}/>)}
      <br />
      <br />
      <Progressive n={1} />
    </Fragment>
  );
};
Enterpassword.propTypes = {
  enterpassword:PropTypes.func.isRequired,
  details:PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  details:state.signin
})
export default connect(mapStateToProps,{enterpassword})(Enterpassword);
