const listDatabases = async (client) => {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases: ");
  databasesList.databases.forEach((db) => {
    console.log(` - ${db.Name}`);
  });
};

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbName} database`);
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
  }
};
