/*Controller file for Entries*/

/*Bring the post model */
const Post = require("../Models/user");

const Profile = require("../Models/profile");

const mongoose = require("mongoose");

/*
@desc:CREATE A ENTRY
@route:/posts/createEntry
@access:PRIVATE
*/

exports.createEntry = async (req, res, next) => {
  try {
    /*Post object for creating a post*/
    const post = {};

    /*Array for errors */
    const errors = [];
    post.user = req.user._id;

    if (!req.body.posttext) {
      errors.push("Please add a text for creating post");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    if (!req.body.heading) {
      errors.push("Please add a heading for creating post");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    post.posttext = req.body.posttext;
    post.heading = req.body.heading;
    post.name = req.user.firstname + " " + req.user.lastname;
    const prof = await Profile.findOne({ user: req.user._id });
    if (prof) {
      post.createrpic = prof.profileimagetext;
    } else {
      post.createrpic = "profilephoto.svg";
    }
    const createdPost = await Post.create(post);
    return res.status(200).json({
      success: true,
      data: createdPost,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
