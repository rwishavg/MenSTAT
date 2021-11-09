const express = require('express');

/*Use Routes */
const router = express.Router();

/*Bring the auth middleware */
const auth = require('../Middlewares/auth');

/*All route functions are in the Controller folder */
const {
  registerUser,
  login,
  currentUser,
} = require("../Controllers/user");


router.route("/users/register").post(registerUser);

router.route("/users/login").post(login);

router.route("/users/getcurrentuser").get(auth, currentUser);

module.exports = router;