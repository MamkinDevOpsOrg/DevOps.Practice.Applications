const { pbkdf2Sync } = require('node:crypto');
const { logCpuUsage, logMemoryUsage } = require('../../helpers/logs');

// CPU stress
async function load_cpu(req, res) {
  const cpu_utilization = Number(req.params.cpu_utilization) || 25;
  const cpuLoad = Math.max(0, Math.min(cpu_utilization / 100, 1));

  console.log(`[CPU] Start with ~${cpu_utilization}% load (1 vCPU)`);

  const cpuStart = process.cpuUsage();
  const durationMs = 10_000;
  const burnInterval = 100;
  const endTime = Date.now() + durationMs;

  function burnCpu() {
    const now = Date.now();
    if (now >= endTime) {
      console.log('[CPU] End');
      logCpuUsage('CPU - Total', cpuStart);
      return res.status(200).json({ message: 'CPU stress done' });
    }

    const burnTime = burnInterval * cpuLoad;
    const sleepTime = burnInterval - burnTime;

    const start = Date.now();
    while (Date.now() - start < burnTime) {
      pbkdf2Sync('secret_password', 'salt', 20_000, 64, 'sha512');
    }

    setTimeout(burnCpu, sleepTime);
  }

  burnCpu();
}

// Memory stress (allocates 256 MB for 10 seconds)
async function load_mem(req, res) {
  console.log('[MEM] Start');
  logMemoryUsage('MEM - Before allocation');

  const megabytes = 256;
  const bufferArray = [];

  for (let i = 0; i < megabytes; i++) {
    bufferArray.push(Buffer.alloc(1024 * 1024));
  }

  logMemoryUsage('MEM - After allocation');

  setTimeout(() => {
    bufferArray.length = 0;
    res.status(200).json({ message: 'Memory stress done' });
  }, 10_000);
}

module.exports = { load_cpu, load_mem };
