const constants = require("../constants");
const { DB_DEV, DB_HOST, DB_PORT = 5432, DB_SECRET, DB_TEST, DB_USER } = constants;

const commonConfig = {
  username: DB_USER,
  password: DB_SECRET,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
};

module.exports = {
  development: {
    ...commonConfig,
    database: DB_DEV,
  },
  test: {
    ...commonConfig,
    database: DB_TEST,
  },
  production: {
    ...commonConfig,
    use_env_variable: "DATABASE_URL",
  },
};
