const mongoose = require("mongoose");

exports.ConnectDb = () => {
  const DB = `${process.env.MONGODB_URI.replace(
    "<db_password>",
    process.env.DB_PASSWORD
  )}/${process.env.DATABASE}`;
  mongoose
    .connect(DB, {})
    .then((con) => {
      console.log("DB connection success....");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
