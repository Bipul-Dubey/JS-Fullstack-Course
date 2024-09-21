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
const server = app.listen(port, () => {
  console.log("App running on port: ", port);
});

// execute for un handled promises
process.on("unhandledRejection", (err) => {
  console.log(
    "unhandledRejection! 💥💥💥 Shutting down...",
    err.name,
    " : ",
    err.message
  );

  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(
    "uncaughtException! 💥💥💥 Shutting down...",
    err.name,
    " : ",
    err.message
  );
});

// Notes:
// nbd : node debugger -  by google - npm i nbd
/* 
Errors:
Operational Errors:
- Invalid path accessed, Invalid user input (validator error from mongoose), Failed to connect to server/database, Request timeout
Programming errors
*/

/*
Data Modelling:
1. Different types of relations between data (1:1, 1:many, many:many)
2. referencing/normalization vs embedding/denormalization
3. Embedding (keep data in same document)  or referencing (keep data in another document and keep ids for reference)
4. Types of referencing
*/
