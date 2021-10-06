/*Module for environment variables*/
const dotenv = require("dotenv");

/*Configure the path for env variables */
dotenv.config({
  path: "./utils/config.env",
});
const path = require("path");
/*Module for uploading file */
const fileupload = require("express-fileupload");
const express = require("express");
const http = require("http");
const colors = require("colors");

/*Bring the database file */
const connectDb = require("./utils/database");

/*Bring the route files */
const posts = require("./Routes/createEntry");

/*Module to prevent no sql injection */
const mongoSanitize = require("express-mongo-sanitize");

/*Module for xss security  and set security headers*/
const helmet = require("helmet");

/*Xss*/
const xss = require("xss-clean");

/*Rate limiter*/
const rateLimit = require("express-rate-limit");

const hpp = require("hpp");

const cors = require("cors");

const app = express();

connectDb();

/*Middleware function to use request.body */
app.use(express.json());

/*file upload */
app.use(fileupload());

app.use(mongoSanitize());

/* Set security headers*/
app.use(helmet());

/* Prevent cross site srcipting*/
app.use(xss());

/*Rate limit*/
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000 /*10 mins*/,
  max: 100,
});
app.use(limiter);

/*Enable cors*/
app.use(cors());

/*Set static folder */
app.use(express.static(path.join(__dirname, "Public")));

/*Routes */
app.use("/api/v1/", user);
app.use("/api/v1/", profile);
app.use("/api/v1/", posts);



//Serve static asset in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT || 5000, () => {
    console.log(process.env.PORT)
  console.log(`Server running at post ${process.env.PORT}`.cyan.inverse);
});