const { MongoClient } = require("mongodb");

// Build circulation object (Revealing Module Pattern)
function circulationRepo() {
  // DB Url & Name
  const url = "mongodb://localhost:27017";
  const dbName = "circulation";

  function loadData(data) {
    return new Promise(async (resolve, reject) => {
      // Cretae new client
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        //  Insert Data
        results = await db.collection("newspapers").insertMany(data);
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  }
  return { loadData };
}

module.exports = circulationRepo();
