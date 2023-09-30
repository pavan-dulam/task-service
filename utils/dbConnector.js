const { Sequelize } = require('sequelize');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
class Database {
  constructor() {
    if (!Database.instance) {
      this._initialize();
      Database.instance = this;
    }

    return Database.instance;
  }

  _initialize() {
    this._sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
    });
  }

  get connection() {
    return this._sequelize;
  }
}

module.exports = Database;
