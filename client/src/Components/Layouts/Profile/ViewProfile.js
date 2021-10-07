import React,{Fragment} from 'react'
import classes from './viewprofile.module.css';
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

import PropTypes from'prop-types';
import defaultphoto from '../../../assets/profilephoto.svg'
const ViewProfile = (props) =>  {
    let profile = props.profile
    if(typeof(profile)==='string'){
        profile = JSON.parse(props.profile);
    }
    let image;
    //If there is no profile pircture then set the image as a default profile picture
    if(profile==null||profile.profileimagetext==null||profile.profileimagetext.length==0){
        image = defaultphoto
    }
    else {
        image = 'http://localhost:5000/images/'+profile.profileimagetext;
    } 

    //Skill arrray
    let skill = [];

    //Make the skill string into an array so that it can be mapped
    if(profile!=null){
      if(profile.skills!=null&&profile.skills.length > 0){
       skill = profile.skills.split(",");
      }
    }

    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    if(profile!=null){
    return (
      <Fragment>
        <Navbar />
        <div className={classes["profile"]}>
          <div className={classes["top"]}>
            <div className={classes["name"]}>
              <h1>{profile.name}</h1>
            </div>
            <div className={classes["photo"]}>
              <div
                className={classes["profile-photo"]}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          </div>
          <Link to="/editprofile">
            <button className={classes["edit"] + " " + classes["res"]}>
              {" "}
              <i className="fas fa-pen"> </i> Edit profile
            </button>
          </Link>
          <p className={classes.heading + " " + classes.res}>Bio :</p>
          <p className={classes[("bio", "res")]}>{profile.bio}</p>
          <p className={classes.heading + " " + classes.res}>Role :</p>
          <p className={classes[("bio", "res")]}>{profile.role}</p>
          <p className={classes.heading + " " + classes.res}>Skills :</p>
          <div className={classes["skills"] + " " + classes["res"]}>
            {skill.map((skill) => {
              return <p className={classes["skill-item"]}>{capitalize(skill)}</p>;
            })}
          </div>
        </div>
      </Fragment>
    );
      }
      else{
       return (
         <Fragment>
           <Navbar/>
           <p>There is no profile</p>
         </Fragment>
       );
      }
}
ViewProfile.propTypes = {
    profile:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile:state.auth.profile
})
export default connect(mapStateToProps,{})(ViewProfile);