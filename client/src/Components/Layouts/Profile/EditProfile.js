import React, { useState,useEffect, Fragment } from "react";
import { connect } from "react-redux";
import classes from "./profile.module.css";
import photo from "../../../assets/profilephoto.svg";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import { setprofile } from "../../../Actions/auth";
const axios = require("axios");
const Editprofile = props => {
  const [src, setsrc] = useState(photo);
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState([]);
  const history = useHistory();
  let prf = props.profile;
  if(typeof(prf)==='string'){
      prf = JSON.parse(props.profile);
  }
  let img;
  if(prf.profileimagetext===null){
    img = photo
  }
  else {
      img = 'http://localhost:5000/images/'+prf.profileimagetext
  }
  useEffect(() => {
    setsrc(img);
  }, [img])

  const [details, setdetails] = useState({
    file: img,
    name:prf.name,
    university: prf.university,
    skills: prf.skills,
    role: prf.role,
    bio:prf.bio
  });


  const onchange = e => {
    setdetails({ ...details, file: e.target.files[0] });
    if (e.target.files.length === 0) {
      return;
    }
    const reader = new FileReader();
    if (e.target.files != null) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setsrc(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onchange2 = e => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const onsubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setloading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };
    try {
      const formData = new FormData();
      formData.append("file", details.file);
      formData.append("name", details.name);
      formData.append("role", details.role);
      formData.append("university", details.university);
      formData.append("skills", details.skills);
      formData.append("bio", details.bio);
      console.log(formData);
      const res = await axios.post(
        "/api/v1/profile/createandmodify",
        formData,
        config
      );
     await props.setprofile(res.data.data);
      history.push("/userprofile");
    } catch (error) {
      setloading(false);
      const errors = [];
      if (typeof error.response.data.data == "string") {
        errors.push(error.response.data.data);
        seterr(errors);
      } else if (typeof error.response.data.data == "object") {
        error.response.data.data.map(err => errors.push(err));
        seterr(errors);
      }
    }
  };
  const { university, skills, role,bio,name } = details;
  if (loading === false) {
    return (
      <Fragment>
        <div className={"container " + classes["head"]}>
          <h2>
            <i className={"fas fa-user " + classes["iclass"]}></i>
            Hello, {prf.name}
          </h2>
        </div>
        <div className="container" style={{ marginTop: "25px" }}>
          <form
            className={classes["complete-profile"]}
            enctype="multipart/form-data"
          >
            <div
              className={classes["photoview"]}
              style={{
                backgroundImage: "url(" + src + ")"
              }}
            ></div>
            <label className={classes["lbl"]} for="upload">
              Upload
            </label>
            <input
              id="upload"
              className={classes["p-input"]}
              type="file"
              onChange={e => onchange(e)}
              accept="image/*"
              multiple={false}
            />
            <label className={classes["label1"]} for={classes["uni"]}>
              Enter your name:{" "}
            </label>
            <input
              type="text"
              className={classes["uni"]}
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onchange2(e)}
            />
            <label className={classes["label1"]} for={classes["uni"]}>
              Enter your university name:{" "}
            </label>
            <input
              type="text"
              className={classes["uni"]}
              placeholder="Ex:IIT Delhi"
              name="university"
              value={university}
              onChange={e => onchange2(e)}
            />
            <br />
            <label className={"label1"} for={classes["uni"]}>
              Enter skills (comma seperated values) :{" "}
            </label>
            <input
              type="text"
              className={classes["uni"]}
              placeholder="Ex: Java,C++,Flutter"
              maxLength={55}
              name="skills"
              value={skills}
              onChange={e => onchange2(e)}
            />
            <label className={"label1"} for={classes["uni"]}>
              Enter bio :{" "}
            </label>
            <input
              type="text"
              className={classes["uni"]}
              placeholder="How do you do :)"
              maxLength={100}
              name="bio"
              value={bio}
              onChange={e => onchange2(e)}
            />

            <label className={classes["label1"]} for={classes["role"]}>
              Enter your role{" "}
            </label>
            <select
              className={classes["role"]}
              value={role}
              name="role"
              onChange={e => onchange2(e)}
            >
              <option value="Front End Developer">Front End Developer</option>
              <option value="Teacher">Teacher</option>
              <option value="Competitive Programmer">
                Competitive Programmer
              </option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Security Analiyst">Security Analiyst</option>
              <option value="Data Analysit">Data Analysit</option>
              <option value="Student" selected>
                Student
              </option>
            </select>
            <div className={classes["profilepic"]}></div>
            <div className={"container " + classes["cont"]}>
              {err.map(err => (
                <div className={classes["err"]}>
                  <p>* {err}</p>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className={classes["submit-btn"]}
              onClick={e => onsubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};
Editprofile.propTypes = {
  details: PropTypes.object.isRequired,
  setprofile: PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  details: state.auth,
  profile:state.auth.profile
});

export default connect(mapStateToProps, { setprofile })(Editprofile);
