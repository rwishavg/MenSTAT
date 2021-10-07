import React, {useState,useEffect,Fragment } from "react";
import classes from "./Styles/signup.module.css";
import Progressive from "./Progressive";
import {useHistory,Redirect} from 'react-router-dom'
import Error from './Error';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {enteremail} from '../../Actions/signin';
import axios from 'axios';
import Spinner from '../Layouts/Spinner';
const Enteremail = (props) => {
  const[eml,setemail] = useState(props.details.email);
  const[err,seterr] = useState([]);
  const [loading,setloading] = useState(false);
  const email = eml;
  const history = useHistory();
  if(props.details.firstname.length==0||props.details.lastname.length==0||props.details.password.length==0){
    return<Redirect to="/signup"/>
  }
  const onchange = (e) => {
    setemail(e.target.value)
    seterr([]);
  }

  const onsubmit = async(e) => {
    setloading(true);
    const errors = [];
    e.preventDefault();
    if(eml.length == 0){
      setloading(false);
      errors.push('Please enter an email');
      seterr(errors);
      return;
    }
    if(!eml.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)){
      errors.push('Please enter a valid email address');
      setloading(false);
    }

    try {
      const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    console.log(eml);
        const data = {
            "firstname":props.details.firstname,
            "email": eml.toString(),
            "lastname":props.details.lastname,
            "password":props.details.password
          }
      const res = await axios.post(
        "/api/v1/users/register",
        data,
        config
      );
    } catch (error) {
      console.log(error.response.data.data);
        if(error.response.data.data){
          errors.push(error.response.data.data);
          seterr(errors);
          setloading(false);
          return;
        }

    }
    seterr(errors);
    if(errors.length  == 0){
      props.enteremail(eml);
      history.push('/entertoken')
    }
  }
  if(loading==false){
  return (
    <Fragment>
      <div className={"container d-flex" + " " + classes["all"]}>
        <form className={classes["form"]}>
          <h3>Enter email</h3>
          <input
            className={classes["input"]}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => onchange(e)}
          />
          <button onClick={e => onsubmit(e)} className={classes["subbtn"]}>
            Next
          </button>
        </form>
      </div>
      {err.map(err => (
        <Error msg={err} key="err" />
      ))}
      <br />
      <br />
      <Progressive n={2} />
    </Fragment>
  );
}
else{
  return (
    <Spinner/>
  )
}
}
Enteremail.propTypes = {
  details: PropTypes.object.isRequired,
  enteremail: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  details:state.signin
})
export default connect(mapStateToProps,{enteremail})(Enteremail);
