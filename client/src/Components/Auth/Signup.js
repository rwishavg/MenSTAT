import React,{useState,useEffect,Fragment}from 'react'
import classes from './Styles/signup.module.css';
import Progressive from './Progressive';
import { useHistory } from "react-router-dom";
import Error from './Error';
import {connect} from 'react-redux';
import{registername} from '../../Actions/signin';
import PropTypes from 'prop-types';
const Signup = (props) => {
   
    const [details, setDetails] = useState({
        firstname: props.details.firstname,
        lastname: props.details.lastname,
      });
  const onchange = e => {
    setDetails({...details,[e.target.name]:e.target.value});
    seterr([]);
  }
  const { firstname, lastname } = details;
  const inital = [];
  const [err,seterr] = useState(inital);
  const history = useHistory();
  const clicked = (e) => {
    e.preventDefault();
    const errors = [];
    if(firstname.length == 0){
      errors.push('Please enter firstname')
    }
    if(lastname.length == 0){
      errors.push('Please enter lastname');
    }
    seterr(errors);
    if(errors.length == 0){
      props.registername(firstname,lastname);
      history.push('/registerpassword')
    }
  }
    return (
      <Fragment>
        <div className={"container d-flex" + " " + classes["all"]}>
          <form className={classes["form"]}>
            <h3>Sign Up</h3>
            <input
              className={classes["input"]}
              type="text"
              placeholder="Firstname"
              name="firstname"
              onChange={e => onchange(e)}
              value={firstname}
            />
            <input
              className={classes["input"]}
              type="text"
              placeholder="Lastname"
              name="lastname"
              onChange={e => onchange(e)}
              onChange={e => onchange(e)}
              value={lastname}
            />
            <button onClick={e => clicked(e)} className={classes["subbtn"]}>
              Next
            </button>
          </form>
        </div>
        {err.map(err => <Error msg = {err} />)}
        <br />
        <br />
        <Progressive n = {0} />
      </Fragment>
    );
}
registername.propTypes = {
  registername:PropTypes.func.isRequired,
  details:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  details:state.signin
})
export default connect(mapStateToProps,{registername})(Signup);
