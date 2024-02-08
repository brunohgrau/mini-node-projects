import promptModule from "prompt-sync";
const prompt = promptModule();
const mockDB = { passwords: {} };
import { MongoClient } from "mongodb";
let hasPasswords = false;
const client = new MongoClient("mongodb://localhost:27017");
const dbName = "passwordManager";

const main = async () => {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const authCollection = db.collection("auth");
  const passwordsCollection = db.collection("passwords");
  const hashedPassword = await authCollection.findOne({ type: "auth" });

  return [passwordsCollection, authCollection];
};

main();
