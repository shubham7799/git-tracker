const { Sequelize } = require("sequelize");
const config = require("../config/config.js")["development"];

const initializeDatabase = async () => {
  try {
    const sequelize = new Sequelize(
      "postgres",
      config.username,
      config.password,
      {
        host: config.host,
        dialect: config.dialect,
      }
    );

    const databaseName = config.database;

    // Check if the database exists
    const [results] = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`
    );

    if (results.length === 0) {
      // Database does not exist, create it
      await sequelize.query(`CREATE DATABASE "${databaseName}"`);
      console.log(`Database "${databaseName}" created successfully!`);
    } else {
      console.log(`Database "${databaseName}" already exists.`);
    }

    await sequelize.close();
  } catch (error) {
    console.error("Error during database initialization:", error.message);
  }
};

initializeDatabase();
