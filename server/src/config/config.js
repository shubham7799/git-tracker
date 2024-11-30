module.exports = {
  
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DIALECT,
  // development: {
  // },
  // test: {
  //   username: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  //   host: process.env.DATABASE_HOST,
  //   dialect: process.env.DIALECT,
  // },
  // production: {
  //   username: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  //   host: process.env.DATABASE_HOST,
  //   dialect: process.env.DIALECT,
  // },
};