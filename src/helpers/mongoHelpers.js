// contains all db related code

/**
 * MongoDB Helper for Playwright Tests
 * Fully aligned with Unified TestConfig
 */

const { MongoClient } = require('mongodb');  //importing the MongoClient class from the MongoDB package
const config = require('../config/config'); // unified TestConfig

class MongoDBHelper {
  constructor() {
    const { database, env } = config.get();

    this.env = env;
    this.connectionUrl = database.mongoUrl;   // dynamic from TEST_ENV
    this.databases = database.databases;      // CAP, KFS etc

    this.client = null;
    this.db = null;
  }

  /* ===============================
     Connection Management
  =============================== */

  async connect(service = 'CAP') {
    if (!this.client) {
      this.client = new MongoClient(this.connectionUrl);
      await this.client.connect();
      console.log(`[MongoDB] Connected to ${this.env.toUpperCase()} environment`);
    }

    const dbName = this.databases[service];

    if (!dbName) {
      throw new Error(`Invalid database service: ${service}`);
    }

    this.db = this.client.db(dbName);

    return this.db;
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('[MongoDB] Connection closed');
    }
  }

  /* ===============================
     CRUD Operations
     Default service = CAP
  =============================== */

  async insertOne(collection, doc, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).insertOne(doc);
  }

  async insertMany(collection, docs, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).insertMany(docs);
  }

  async findOne(collection, query = {}, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).findOne(query);
  }

  async findMany(collection, query = {}, options = {}, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).find(query, options).toArray();
  }

  async updateOne(collection, filter, update, options = {}, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).updateOne(filter, update, options);
  }

  async updateMany(collection, filter, update, options = {}, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).updateMany(filter, update, options);
  }

  async deleteOne(collection, filter, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).deleteOne(filter);
  }

  async deleteMany(collection, filter, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).deleteMany(filter);
  }

  async countDocuments(collection, query = {}, service = 'CAP') {
    const db = await this.connect(service);
    return db.collection(collection).countDocuments(query);
  }
}

module.exports = { MongoDBHelper };
