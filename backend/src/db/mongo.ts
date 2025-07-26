import { MongoClient, ServerApiVersion, Db } from "mongodb";
import "dotenv/config"; // This loads the .env file

console.log(process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDB(): Promise<Db> {
  try {
    await client.connect();
    console.log("✅ Succesfuly connected to DB");
    return client.db("burn2");
  } catch (err) {
    console.error("❌ Connection error:", err);
    throw err;
  }
}
