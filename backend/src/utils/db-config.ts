import { MongoClient } from "mongodb";
import { DatabaseConnectionError } from "../types/errors";

export const dbconnection = async (database_url: string, database: string) => {
    const client = await MongoClient.connect(database_url);
    if (!client) { throw new DatabaseConnectionError("Error connecting to MongoDB."); }
    
    const db = client.db(database);

    return db;
}