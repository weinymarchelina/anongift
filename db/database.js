const mongoose = require("mongoose");
require("dotenv").config;

const dbConnect = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }

  mongoose.connect(
    process.env.DB_STRING,
    {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to mongodb.");
    }
  );
};

export default dbConnect;
