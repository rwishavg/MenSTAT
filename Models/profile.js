/*Bring in mongoose */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/*Declare the profile schema */
const profileSchema = new Schema({
  /*All profiles should have a id which is associated with the user*/
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name:{
    type: String,
    required:true
  },
  email:{
    type:String,
  },
  profileImage: {
    type: String
  },

  university: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },

  github: {
    type: String
  },
  youtube: {
    type: String
  },
  instagram: {
    type: String
  },
  linkedin:{
    type:String
  },
  profileimagetext:{
    type:String,
    default:null
  },
  followers:[
    {
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    }
    }
  ],
  following:[
    {
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    }
    }
  ]
});

module.exports = mongoose.model("profiles",profileSchema);