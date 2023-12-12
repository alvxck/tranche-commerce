import { MongoClient, Db, MongoNotConnectedError } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
const connectionString: string = process.env.DB_CONN || "";
const database: string = process.env.DB_NAME || "";

let client: MongoClient;

try {
    client = await MongoClient.connect(connectionString);
} catch (e) {
    throw new MongoNotConnectedError("Could not connect to MongoDB.");
}

let db: Db = client.db(database);

export default db;