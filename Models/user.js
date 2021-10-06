const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a firstname"]
  },
  lastname: {
    type: String,
    required: [true, "Please add a lastname"]
  },
  password: {
    type: String,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique:[true,'Email address already exists']
  },
  createdAt:{
      type:Date,
      default:Date.now()
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date
});

module.exports = mongoose.model("users", UserSchema);