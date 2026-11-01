
const { MongoClient } = require('mongodb');

class MongoDBHelper {
  constructor(dbUrl) {
    this.dbUrl = dbUrl;
    this.client = null;
  }

  // Connect to MongoDB
  async connect() {
    this.client = new MongoClient(this.dbUrl);
    await this.client.connect();
  }

  // Get database
  getDatabase(dbName) {
    return this.client.db(dbName);
  }

  // Insert a single document
  async insertOne(dbName, collectionName, data) {
    return await this.getDatabase(dbName)
      .collection(collectionName)
      .insertOne(data);
  }

  // Find a single document
  async findOne(dbName, collectionName, query = {}) {
    return await this.getDatabase(dbName)
      .collection(collectionName)
      .findOne(query);
  }

  // Find multiple documents
  async findMany(dbName, collectionName, query = {}) {
    return await this.getDatabase(dbName)
      .collection(collectionName)
      .find(query)
      .toArray();
  }

  // Update a single document
  async updateOne(dbName, collectionName, filter, updateData) {
    return await this.getDatabase(dbName)
      .collection(collectionName)
      .updateOne(filter, { $set: updateData });
  }

  // Delete a single document
  async deleteOne(dbName, collectionName, query) {
    return await this.getDatabase(dbName)
      .collection(collectionName)
      .deleteOne(query);
  }

  // Disconnect from MongoDB
  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }
}

module.exports = { MongoDBHelper };
