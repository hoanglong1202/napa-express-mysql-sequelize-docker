const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');

const filename = path.join(__dirname, '../logs', 'serverLogs.log');

const logEvents = async (msg) => {
  // const datetime = `${moment(new Date(), 'dd-MM-yyyy \tss:mm:HH')}`;
  const datetime = `${moment().format('Do-MM-yyyy h:mm:ss a')}`;
  const content = `${datetime}---${msg}\n`;

  try {
    fs.appendFile(filename, content);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = logEvents;
