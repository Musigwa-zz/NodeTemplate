const mongoose = require("mongoose");
const { PORT, DB_URL } = require("../constants");

class Database {
  static async dbConnect() {
    try {
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Listening on port ${PORT}, DB connected successfully!`);
    } catch (error) {
      console.error("There was an error:", error);
    }
  }
}

module.exports = Database;
