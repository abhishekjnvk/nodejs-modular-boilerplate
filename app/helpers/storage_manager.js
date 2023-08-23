const { StorageManager } = require('@slynova/flydrive');
const storage = new StorageManager({
  default : 'local',
  disks   : {
    local : {
      driver : 'local',
      config : {
        root : process.cwd(),
      },
    },
  },
});

storage.disk('local').driver();

const disk = storage.disk('local');


module.exports = { disk };
