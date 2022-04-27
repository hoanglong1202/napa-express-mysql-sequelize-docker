require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./app/routes");
const logEvents = require("./app/helpers/logEvents");

const app = express();
const db = require("./app/models");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// routing
app.use("/api", routes);

// error handler
app.use((req, res, next) => {
  next(createError(400, "API not found"));
});

app.use((err, req, res, next) => {
  const msg = `${req.url}---${req.method}---${err.status}---${err.message}`;
  logEvents(msg);

  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
    link: {
      docs: "https://docs.com",
    },
  });
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
