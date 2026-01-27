const getSystemInfo = require("./systemInfo");
const logData = require("./logger");

setInterval(() => {
  const systemData = getSystemInfo();
  logData(systemData);
}, 5000);
