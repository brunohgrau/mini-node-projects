const { MongoClient } = require("mongodb");
const assert = require("assert");

// DB Url & Name
const url = "mongodb://localhost:27017/";
const dbName = "circulation";

// Repo & Collection & Data
const circulationRepo = require("./repos/circulationRepo.js");
const data = require("./circulation.json");

async function main() {
  // connectToDatabase()
  const client = new MongoClient(url);
  await client.connect();

  try {
    // Insert/Load data into db with loadData()
    const results = await circulationRepo.loadData(data);
    assert.equal(data.length, results.insertedCount);

    // Get data from db with get()
    const getData = await circulationRepo.get();
    // assert.equal(data.length, getData.length);

    // Filter Data from db with a query on get({query})
    const filterData = await circulationRepo.get({
      Newspaper: getData[4].Newspaper,
    });
    assert.deepEqual(filterData[0], getData[4]);

    // Limit Data
    const limitData = await circulationRepo.get({}, 3);
    assert.equal(limitData.length, 3);

    // Get by ID
    const id = getData[4]._id.toString();
    const byId = await circulationRepo.getById(id);
    assert.deepEqual(byId, getData[4]);

    // Add Item
    const newItem = {
      Newspaper: "My Paper",

      "Daily Circulation, 2004": 1,
      "Daily Circulation, 2013": 2,
      "Change in Daily Circulation, 2004-2013": 1,
      "Pulitzer Prize Winners and Finalists, 1990-2003": 41,
      "Pulitzer Prize Winners and Finalists, 2004-2014": 41,
      "Pulitzer Prize Winners and Finalists, 1990-2014": 85,
    };
    const addedItem = await circulationRepo.add(newItem);
    console.log(addedItem);
    const addedItemQuery = await circulationRepo.getById(addedItem._id);
    assert.deepEqual(addedItemQuery, addedItem);
  } catch (error) {
    console.log(error);
  } finally {
    // listDatabases()
    const admin = client.db(dbName).admin();

    // Clean DB
    //await client.db(dbName).dropDatabase();

    console.log(await admin.listDatabases());

    // Close connectToDatabase()
    client.close();
  }
}

main();
