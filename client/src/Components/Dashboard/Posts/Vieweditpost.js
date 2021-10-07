import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./createpost.module.css";
import Error from "../../Auth/Error";
import EditRichTextEditor from "../../EditRichTextEditor";
import Navbar from "../../Layouts/Navbar/Navbar";
import { connect } from "react-redux";
import { setsinglepost } from "../../../Actions/post";
import axios from "axios";

const Vieweditpost = (props) => {
  const history = useHistory();
  const [details, setdetails] = useState({
    heading: props.post.heading,
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
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const formdata = new FormData();
      formdata.append("heading", heading);
      formdata.append("posttext", props.postdata);
      const url = "/api/v1/posts/editpost/" + props.post._id;
      const res = await axios.put(url, formdata, config);
      console.log(res);
      await props.setsinglepost(props.post._id);
      history.push("/post");
    } catch (error) {
      console.log(error);
    }
  };
  const { heading } = details;
  return (
    <div>
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
          <hr />
          <EditRichTextEditor />
          <div className={classes["submit-div"]}>
            <button className={classes["submit"]} onClick={(e) => submit(e)}>
              <i className="fas fa-pen"></i> Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
const mapStatetoProps = (state) => ({
  post: state.post.editpost,
  postdata: state.post.editpostdata,
});
export default connect(mapStatetoProps, { setsinglepost })(Vieweditpost);
