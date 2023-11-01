const { MongoClient, ObjectId } = require('mongodb');
const { URI_MONGODB, SERVER_DB } = require("../env");

function mongoconnect(databasename, uri) {
  let client = new MongoClient(uri);
  client.connect();
  return client.db(databasename);
}

// DB Rating
const database = mongoconnect(SERVER_DB, URI_MONGODB);
const admin_collection = database.collection("admin");
const rating_collection = database.collection("rating");

module.exports = {
  mongoconnect,
  database,
  admin_collection,
  rating_collection
};
