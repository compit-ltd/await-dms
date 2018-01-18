const program = require('commander');
const { version } = require('./package.json');
const { statuses }  = require('./libs/dms');

function capture() {
  program
    .version(version)
    .option('-t, --task <task name>', 'The name of the DMS task')
    .option('-r, --region [region]', 'The region the DMS task is at', 'us-east-1')
    .option(`-s, --statuses [status1, status2]`, 'The statuses to wait for', 'ready,failed,stopped')
    .option(`-i, --interval [seconds]`, 'Interval to poll DMS', 10)
    .option(`--timeout [seconds]`, 'Timeout to bail (0 for no timeout)', 3600)
  program.on('--help', printExamples);
  program.parse(process.argv);
  let options;

  try {

    options = parseAndValidateArgs(program);

  } catch (error) {
    console.error('\n', error.message);
    program.outputHelp();
    process.exit(1);
  }

  return options;
}

function parseAndValidateArgs({ region, task, statuses: chosesStatuses, interval, timeout }) {
  if (!task) throw new Error(`Task name is required`);
  const parsedStatuses = chosesStatuses.split(',').map(st => st.trim().toLowerCase());
  if (!parsedStatuses || !parsedStatuses.length) throw new Error(`At least one status is required`);
  parsedStatuses.forEach(st => {
    if (!statuses.includes(st)) throw new Error(`Bad status provided: ${st}`);
  })

  return { task, region, statuses: parsedStatuses, interval, timeout };
}

function printExamples() {
  console.log(`
  Examples:

      # Wait for default statuses in N. Virginia (us-east-1)
      $ node index.js --task my-task-id

      # Wait for task "my-task-id" in Ireland (eu-west-1)
      $ node index.js --t my-task-id -r eu-west-1

      # Wait for statuses starting, running
      $ node index.js --t my-task-id -s starting,running

      # Check every 3 seconds, bail after 2 hours
      $ node index.js --t my-task-id -i 3 --timeout 7200

  Possible Statuses:
    ${statuses.join(', ')}
`)
}

module.exports = {
  capture
}
