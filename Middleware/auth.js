/*User model */
const User = require("../Models/user");

/*Bring jwt */
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    /*Bring the token from the headers */
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({
        success: false,
        data: "Not authorized to use this route",
      });
    }

    /*Verify the token */
    const decodedid = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedid) {
      return res.status(401).json({
        success: false,
        data: "Not authorized to use this route",
      });
    }

    /*Find the user with that id */
    const user = await User.findOne({ _id: decodedid.id }).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        data: "Not authorized to use this route",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      data: "Session expired",
    });
    next();
  }
};

module.exports = auth;