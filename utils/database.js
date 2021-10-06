const mongoose = require("mongoose");
const colors = require("colors");
/*Mongodb url */
const URL = process.env.MONGODB_URL;

const connectDb = async () => {
  await mongoose.connect(
    URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Mongo DB connected".green.inverse);
    }
  );
};
module.exports = connectDb;