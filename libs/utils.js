const moment = require('moment');

async function wait(seconds = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

function isTimeout(startTime, timeout) {
  if (!timeout) return false;
  return (new Date() - startTime) > timeout * 1000;
}

function arrToStr(arr, delim = ' / ') {
  return `"${arr.join('"' + delim + '"')}"`;
}

function formatTimeSpan(startTime, endTime = new Date()) {
  const formatted = moment(endTime - startTime).utc().format('H[ hours] m[ minutes] s[ seconds]')
  return formatted;
}

module.exports = {
  wait,
  isTimeout,
  arrToStr,
  formatTimeSpan
}
