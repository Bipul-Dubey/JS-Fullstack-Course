const mongoose = require("mongoose");
/*
-- Mongoose is an Object Data Modeling (ODM) library for MongoDB and node.js
a higher level of abstraction
-- Mongoose allows for rapid and simple development of mongodb database interactions
-- Features:  schemas to model data and relationships, easy data validation, simply query API,
middleware, ets.
-- Mongoose schema: where we model our data, by describing the structure of the data, default values, and validation
-- Mongoose model: a wrapper for the schema, providing an interface to the database for CRUD operations
 */

const dotenv = require("dotenv");
dotenv.config();

// db connection
const DB = `${process.env.MONGODB_URI}/${process.env.DATABASE}`;
mongoose
  .connect(DB, {})
  .then((con) => {
    console.log("DB connection success....");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const app = require("./app");

// ======== start server ======
const port = process.env.PORT;
app.listen(port, () => {
  console.log("App running on port: ", port);
});