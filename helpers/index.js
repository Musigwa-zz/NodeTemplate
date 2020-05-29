const mongoose = require("mongoose");

const models = require("../models");
const { PORT, DB_URL } = require("../constants");

class Helpers {
  static async dbConnect() {
    const { sequelize } = models;
    try {
      await sequelize.authenticate();
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Listening on port ${PORT}, DB connection established!`);
    } catch (error) {
      console.error("There was an error connecting to the database:", error);
      process.exit(1);
    }
  }
}

module.exports = Helpers;
