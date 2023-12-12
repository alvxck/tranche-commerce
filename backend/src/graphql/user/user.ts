import { UserDbOperations } from './user-db-operations.js';


const typeDefs = {};

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