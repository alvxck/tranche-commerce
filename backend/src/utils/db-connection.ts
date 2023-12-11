import { MongoClient } from "mongodb";

const dbconnection = async (database_url: string, database: string) => {
    try {
        const client = await MongoClient.connect(database_url);
        const db = client.db(database);

        return db;
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    } 
}