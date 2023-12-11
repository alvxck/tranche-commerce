import { MongoClient, Db } from "mongodb";
import { DatabaseConnectionError } from "../types/errors";
import dotenv from 'dotenv';

dotenv.config();
const connectionString: string = process.env.DB_CONN || "";
const database: string = process.env.DB_NAME || "";

let client: MongoClient;

try {
    client = await MongoClient.connect(connectionString);
} catch (e) {
    throw new DatabaseConnectionError("Unable to connect to MongoDB client: " + e.message);
}

let db: Db = client.db(database);

export default db;