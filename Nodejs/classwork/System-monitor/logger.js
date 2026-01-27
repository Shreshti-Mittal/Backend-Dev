const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "system-log.txt");

function logData(data) {
  const logEntry =
    `${new Date().toISOString()} | CPU: ${data.cpuCount} | ` +
    `FreeMem: ${data.freeMemory} | TotalMem: ${data.totalMemory} | ` +
    `Platform: ${data.platform}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error writing system log");
    }
  });
}

module.exports = logData;
