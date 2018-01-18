const AWS = require('aws-sdk');

const _statuses = [
  'creating',
  'running',
  'stopped',
  'stopping',
  'deleting',
  'failed',
  'starting',
  'ready',
  'modifying',
];

class DMS {
  constructor({ region }) {
    this.region = region;
    this.client = new AWS.DMS({ region })
  }

  static get statuses() {
    return _statuses;
  }

  async getTaskStatus({ task }) {
    console.log(`Getting DMS task status...`);

    try {
      const result = await this.client.describeReplicationTasks({
        Filters: [
          {
            "Name": "replication-task-id",
            "Values": [task]
          }
        ]
      }).promise();

      const tasks = result.ReplicationTasks;
      if (!tasks.length) throw new Error(`No tasks found`);
      const firstTaskFound = tasks[0];
      const status = firstTaskFound.Status
      return status;
    } catch (error) {
      console.error(`Error getting DMS task status`);

      throw error;
    }
  }
}

module.exports = DMS;
