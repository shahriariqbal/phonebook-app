const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/phonebookDB",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB connection Succeded...");
    } else {
      console.log("Error in DB connection...");
    }
  }
);

require("./contacts.model");
