const { MongoClient } = require("mongodb");

// Revealing Module Pattern
function circulationRepo() {
  const url = "mongodb://localhost:27017/";
  const dbName = "circulation";
  const collection_name = "newspapers";

  function get(query) {
    return new Promise(async (resolve, reject) => {
      // connectToDatabase()
      const client = new MongoClient(url);
      const accountsCollection = client.db(dbName).collection(collection_name);
      try {
        // connectToDatabase()
        await client.connect();
        // find()
        const items = accountsCollection.find(query);
        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      // connectToDatabase()
      const client = new MongoClient(url);
      const accountsCollection = client.db(dbName).collection(collection_name);
      try {
        // connectToDatabase()
        await client.connect();
        // insertMany()
        results = await accountsCollection.insertMany(data);
        resolve(results);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }
  return { loadData, get };
}

module.exports = circulationRepo();
