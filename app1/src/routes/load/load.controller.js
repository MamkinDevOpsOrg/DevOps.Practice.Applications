const { logCpuUsage, logMemoryUsage } = require('../../helpers/logs');

// CPU stress (burns ~20-25% of 1 core for 10 seconds)
async function load_cpu(req, res) {
  console.log('[CPU] Start');

  const cpuStart = process.cpuUsage();
  const endTime = Date.now() + 10_000;
  const burnInterval = 100;
  const cpuLoad = 0.25;

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
      Math.sqrt(Math.random()); // lightweight CPU work
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
