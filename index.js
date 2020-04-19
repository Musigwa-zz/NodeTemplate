const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");

const passportConfig = require("./middleware/passport.js");
const routes = require("./routes");
const { PORT } = require("./constants");
const Database = require("./database");

const { json, urlencoded } = express;
const app = express();
if (app.get("env") === "development") app.use(morgan("dev"));

app.use(json(), urlencoded({ extended: true }));
app.use(cors(), helmet(), passport.initialize());

passportConfig(passport);
app.use("/api", routes);

const server = app.listen(PORT, Database.dbConnect);

module.exports = server;
