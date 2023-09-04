// external imports
const mongoose = require("mongoose");
//require("dotenv").config();

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(process.env.DATABASE_URL, {
      //   these are options to ensure that the connection is done properly
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      //useCreateIndex: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB!");
    })
    .catch((error: any) => {
      console.log("Unable to connect to MongoDB!");
      console.log(error);
    });
}

module.exports = dbConnect;