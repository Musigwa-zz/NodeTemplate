const statusCodes = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();

const { PORT = 3000, JWT_KEY, DB_URL, DB_HOST } = process.env;
const { DB_PORT, DB_USER, DB_SECRET, DB_DEV, DB_TEST } = process.env;
const regex = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  avatar: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
  phone: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
};

module.exports = {
  statusCodes,
  errorMessages: {
    NOT_FOUND: "The resource you're looking for is not found",
    UNAUTHORIZED: "Invalid credentials provided",
    ACCESS_DENIAL: "You don't have permission to access this service",
    SERVER_ERROR: " There was an internal server error",
  },
  regex,
  PORT,
  JWT_KEY,
  DB_URL,
  DB_PORT,
  DB_HOST,
  DB_SECRET,
  DB_USER,
  DB_DEV,
  DB_TEST,
};
