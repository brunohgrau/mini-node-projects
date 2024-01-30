const { MongoClient, ObjectId } = require("mongodb");

function bankRepo() {
  const url = require("../compass_url");
  const dbName = "bank";
  const collection_name = "accounts";

  function get(query) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      const accountsCollection = client.db(dbName).collection(collection_name);

      try {
        await client.connect();
        let items = accountsCollection.find(query);
        resolve(await items.toArray());
        // client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      const accountsCollection = client.db(dbName).collection(collection_name);
      try {
        await client.connect();
        results = accountsCollection.insertMany(data);
        resolve(results);
        // client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  return { loadData, get };
}

module.exports = bankRepo();
