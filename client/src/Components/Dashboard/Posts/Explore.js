import React, { Fragment, useState, useEffect } from "react";
import classes from "./prepost.module.css";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Spinner from "../../Layouts/Spinner";
import { setsinglepost, setallpost } from "../../../Actions/post";
import { setusrprofileid } from "../../../Actions/auth";
import Navbar from "../../Layouts/Navbar/Navbar";
import PropTypes from "prop-types";
import post from "../../../Reducers/post";


const Explore = (props) => {
  const history = useHistory();

  useEffect(() => {
    console.log(props.counter);
    const func = async () => {
      await props.setallpost();
    };
    func();
  }, []);

  const ViewOtherProfile = async (e, id) => {
    await props.setusrprofileid(id);
    history.push("/viewuserprofile");
  };
  const read = async (e, post) => {
    e.preventDefault();
    await props.setsinglepost(post._id);
    history.push("/post");
  };

  //Function to remove HTML TAGS from a string
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  } 
  if(props.counter===false){
      return <Spinner/>
  }
  if (props.post.length > 0) {
    return (
      <Fragment>
        <Navbar />
            <Fragment>
              <br/>
              <br/>
              <br/>
              <div className={classes["wrapper"]}>
                {props.post.map((post) => {
                  const html = window
                    .atob(post.posttext)
                    .toString()
                    .substring(0, 55);
                  const txt = removeTags(html);
                  // const photo = "/images/" + post.createrpic;
                  // console.log(`url(${photo})`);
                  return (
                    <Fragment>
                      <div className={classes["item"]}>
                        <h2 className={classes["heading"]}>{post.heading}</h2>
                        <h4
                          className={classes["author"]}
                          onClick={(e) => ViewOtherProfile(e, post.user)}
                        >
                          <i className={classes["clr1"] + " fas fa-pen "}></i>{" "}
                          {post.name}
                        </h4>
                        <h4 className={classes["author1"]}>
                          <i className={classes["clr"] + " far fa-clock"}></i>{" "}
                          {post.createdAt.toString().substring(0, 10)}
                        </h4>
                        <h4 className={classes["author1"]}>
                          <i
                            className={classes["clr"] + " fas fa-thumbs-up"}
                          ></i>{" "}
                          {post.likes.length}
                        </h4>
                        <h4 className={classes["author1"]}>
                          <i
                            className={classes["clr"] + " fas fa-thumbs-down"}
                          ></i>{" "}
                          {post.dislikes.length}
                        </h4>
                        <p className={classes["paragraph"]}>{txt}.......</p>
                        <button
                          className={classes["read"]}
                          onClick={(e) => read(e, post)}
                        >
                          Explore
                        </button>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </Fragment>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="container" style={{ marginTop: "60px" }}>
          <Link to="/createpost">
            <button className={classes["btn"]}>
              <i
                className="fas fa-plus-circle"
                style={{ color: "#720F0F" }}
              ></i>{" "}
              New post
            </button>
          </Link>
        </div>
        <div className={"container " + classes["no"]}>
          <p>No posts yet</p>
          <p>Follow people to see their posts</p>
        </div>
      </Fragment>
    );
  }
};
Explore.propTypes = {
  token: PropTypes.string.isRequired,
  setsinglepost: PropTypes.func.isRequired,
  setallpost: PropTypes.func.isRequired,
  setusrprofileid: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  post: state.post.allposts,
  counter: state.post.expcounter,
});

export default connect(mapStateToProps, {
  setsinglepost,
  setallpost,
  setusrprofileid,
})(Explore);
