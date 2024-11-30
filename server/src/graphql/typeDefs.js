const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type History {
    id: Int!
    uid: String!
    owner_name: String!
    repo_name: String!
    last_release: String
  }

  type Query {
    getAllHistories: [History]

    getHistoryById(id: Int!): History
  }

  type Mutation {
    createHistory(
      uid: String!
      owner_name: String!
      repo_name: String!
      last_release: String
      isNew: Boolean
    ): History

    updateLastRelease(id: Int!, last_release: String): History

    deleteHistory(id: Int!): Boolean
  }
`;

module.exports = typeDefs;
