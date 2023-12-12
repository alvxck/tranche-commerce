import db from "../../utils/db-connection.js";

export class UserDbOperations {
    /** 
     * User operations when interacting with mongodb.
    */

    async getUserById(id: string) {
        /**
         * Get a user by id.
         * @param id - The id of the user.
         * @returns The user object.
        */
        return await db.collection("users").findOne({ id: id });
    }

    async getAllUsers() {
        /**
         * Get all users.
         * @returns An array of user objects.
        */
        return await db.collection("users").find().toArray();
    }
}