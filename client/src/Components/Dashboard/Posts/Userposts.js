import React, { useEffect, useState, Fragment, Link } from "react";
import { useHistory } from "react-router-dom";
import classes from "./userpost.module.css";
import { connect } from "react-redux";
import { getuserposts, seteditpost } from "../../../Actions/post";
import PropTypes from "prop-types";
import Navbar from "../../Layouts/Navbar/Navbar";
import Spinner from "../../Layouts/Spinner";

const Userposts = (props) => {
  useEffect(() => {
    const getpost = async () => {
      await props.getuserposts();
    };
    getpost();
  }, []);
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const history = useHistory();
  const edit = async (e, post) => {
    e.preventDefault();
    await props.seteditpost(post._id);
    history.push("/editpost");
  };
  if(props.counter===false){
    return <Spinner/>
  }
  if (!isEmpty(props.post)) {
    return (
      <Fragment>
        <Navbar />
        <div className={classes["wrapper"]}>
          {props.post.map((post) => {
            return (
              <Fragment>
                <div className={classes["item-1"]}>
                  <h2 className={classes["head"]}>{post.heading}</h2>
                  <h4 className={classes["author"]}>
                    <i className={"fas fa-pen" + classes["clr"]}></i>{" "}
                    {post.name}
                  </h4>
                  <h4 className={classes["author1"]}>
                    <i className={"far fa-clock " + classes["clr1"]}></i>{" "}
                    {post.createdAt.toString()}
                  </h4>
                  <h4 className={classes["author1"]}>
                    <i className={"fas fa-thumbs-up " + classes["clr1"]}></i>{" "}
                    {post.likes.length}
                  </h4>
                  <h4 className={classes["author1"]}>
                    <i className={"fas fa-thumbs-down " + classes["clr1"]}></i>{" "}
                    {post.dislikes.length}
                  </h4>
                  <h4 className={classes["author1"]}>
                    <i className={"fas fa-comment " + classes["clr1"]}></i>{" "}
                    {post.comments.length}
                  </h4>

                  <button
                    className={classes["read"]}
                    onClick={(e) => edit(e, post)}
                  >
                    <i className={"far fa-edit"}></i> Edit
                  </button>
                </div>
              </Fragment>
            );
          })}
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Navbar />
        <div
          className="container"
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontSize: "20px",
            textTransform: "uppercase",
            color: "grey",
          }}
        >
          <p>You do not have any posts..</p>{" "}
        </div>
      </Fragment>
    );
  }
};
Userposts.propTypes = {
  getuserposts: PropTypes.func.isRequired,
  seteditpost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post.currnetuserposts,
  counter:state.post.usercounter
});
export default connect(mapStateToProps,{
  getuserposts,
  seteditpost,
  seteditpost,
})(Userposts);
