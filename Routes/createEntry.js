const express = require("express");

const router = express.Router();

/*Bring in the authentication middleware */
const auth = require("../Middleware/auth");

const {
  createEntry,
} = require("../Controllers/entry");

router.route("/posts/createpost").post(auth, createEntry);

module.exports = router;