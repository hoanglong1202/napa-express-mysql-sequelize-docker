require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./app/routes");
const createError = require("http-errors");
const winston = require("./app/config/winston");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const db = require("./app/models/configDb");

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined", { stream: winston.stream }));

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// routing
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler
app.use((req, res, next) => {
  next(createError(404, "API not found"));
});

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const msg = `${req.url}---${req.method}---${err.error.toString()}`;
    winston.error(msg);

    res.status(400).json({
      type: err.type,
      message: msg,
    });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const msg = `${req.url}---${req.method}---${err.status}---${err.message}`;
  winston.error(msg);

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
