import React, { Fragment, useState, Profiler } from "react";
import Navbar from "../../Layouts/Navbar/Navbar";
import classes from "./createpost.module.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import RichEditor from "../../RichTexteditor";
import axios from "axios";
import { setsinglepost } from "../../../Actions/post";
import Error from "../../Auth/Error";

const Createpost = (props) => {
  const history = useHistory();
  const [details, setdetails] = useState({
    heading: "",
  });
  const [err, seterr] = useState([]);

  const onchange = (e) => {
    setdetails({ heading: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    let err = [];
    if (heading.length === 0 || heading === null) {
      err.push("Please enter a heading");
      seterr(err);
      return;
    }
    if (props.postbody.length === 0) {
      err.push("Please enter some text for creating a post");
      seterr(err);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const formdata = new FormData();
      formdata.append("heading", heading);
      formdata.append("posttext", props.postbody);
      const res = await axios.post(
        "/api/v1/posts/createpost",
        formdata,
        config
      );
      console.log(res);
      await props.setsinglepost(res.data.data._id);
      history.push("/post");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const { heading } = details;
  return (
    <Fragment>
      <Navbar />
      {err.map((err) => (
        <Error msg={err} />
      ))}
      <form>
        <div>
          <input
            className={classes["heading"]}
            type="text"
            maxLength={50}
            placeholder="Heading"
            name="heading"
            value={heading}
            onChange={(e) => onchange(e)}
          />
          <RichEditor />
          <div className={classes["submit-div"]}>
            <button className={classes["submit"]} onClick={(e) => submit(e)}>
              <i className="fas fa-pen"></i> Create
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

Createpost.propTypes = {
  postheading: PropTypes.string,
  postbody: PropTypes.string,
  setsinglepost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  postheading: state.post.singlepostheading,
  postbody: state.post.singlepostdata,
});
export default connect(mapStateToProps, { setsinglepost })(Createpost);
