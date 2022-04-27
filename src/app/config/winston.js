const winston = require("winston");

const options = {
  file: {
    level: "info",
    filename: `./app/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.label({
      label: `🔥`,
    }),
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf((info) => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`)
  ),
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
