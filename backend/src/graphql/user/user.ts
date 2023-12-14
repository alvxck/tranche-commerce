import { UserDbOperations } from './user-db-operations.js';
import { readFileSync } from "fs";
import gql from "graphql-tag";


const typeDefs = gql(
    readFileSync("schema.graphql", {
        encoding: "utf-8",
    })
);

const _userDbOperations = new UserDbOperations();

const resolvers = {
    User: {

    },
    Query: {
        async user(parent, { id }) {
            return await _userDbOperations.getUserById(id);
        },

        async users() {
            return await _userDbOperations.getAllUsers();
        }
    }
}

export { typeDefs, resolvers };