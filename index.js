const { capture } = require('./cli');
const { wait, isTimeout, arrToStr, formatTimeSpan } = require('./libs/utils');
const DMS = require('./libs/dms');

const { task, region, statuses: desiredStatuses, interval, timeout } = capture();
console.log('Waiting for statuses: "%s" in task "%s" in region "%s"', arrToStr(desiredStatuses), task, region);

const dms = new DMS({ region });

async function main() {
  try {
    while (true) {
      const startTime = new Date();

      const status = await dms.getTaskStatus({ task });
      console.log(`Status: "${status} (You asked for: ${arrToStr(desiredStatuses)})`);
      if (desiredStatuses.some(desiredStatus => desiredStatus === status)) {
        console.log(`Status Match ! ("${status}")`)
        console.log(`Took: ${formatTimeSpan(startTime)}`);
        console.log(`Exiting`);
        process.exit(0);
      }

      await wait(interval);
      if (isTimeout(startTime)) throw new Error(`Timeout reached`);
    };
  } catch (error) {
    console.error(`Error: `, error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

module.exports = {
  main
}
