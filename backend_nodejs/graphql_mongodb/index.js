const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const { createHandler } = require("graphql-http/lib/use/express");
const { ConnectDb } = require("./db/index.js");
const cors = require("cors");
const { schema, resolvers } = require("./graphql/schema.js");
dotEnv.config({
  path: ".env",
});

ConnectDb();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// app.use(
//   "/graphql",
//   createHandler({
//     schema: buildSchema(`
//           type RootQuery {
//               events: [String!]!
//           }

//           type RootMutation {
//               createEvent(name: String!): String
//           }

//           schema {
//               query: RootQuery
//               mutation: RootMutation
//           }
//       `),
//     rootValue: {
//       events: () => {
//         return ["Cooking", "Teaching"];
//       },
//       createEvent: (args) => {
//         const eventName = args.name;
//         return eventName;
//       },
//     },
//     graphiql: true,
//   })
// );

app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL UI
  })
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App running on port: ", `http://localhost:${PORT}`);
});
