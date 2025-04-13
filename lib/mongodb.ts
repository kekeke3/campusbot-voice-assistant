import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;
const options = {};

// Extend the global type
declare global {
    // Only declare the property if it hasn't been declared already
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Prevents re-creating the client in development
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
