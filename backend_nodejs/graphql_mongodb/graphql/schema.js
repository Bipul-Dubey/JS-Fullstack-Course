const { buildSchema } = require("graphql");
const User = require("../model/user");

const schema = buildSchema(`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    age: Int!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User!
  }
`);

const resolvers = {
  getUsers: async () => {
    try {
      return await User.find();
    } catch (err) {
      throw new Error("Failed to fetch users.");
    }
  },

  getUser: async ({ id }) => {
    try {
      return await User.findById(id);
    } catch (err) {
      throw new Error("Failed to fetch user.");
    }
  },

  createUser: async ({ input }) => {
    try {
      const user = new User(input);
      await user.save();
      return user;
    } catch (err) {
      throw new Error("Failed to create user.");
    }
  },
};

module.exports = { schema, resolvers };
