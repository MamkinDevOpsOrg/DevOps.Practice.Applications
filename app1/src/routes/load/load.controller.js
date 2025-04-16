const os = require('os');
const { Worker } = require('node:worker_threads');
const { logCpuUsage, logMemoryUsage } = require('../../helpers/logs');

// CPU stress
async function load_cpu(req, res) {
  const cpu_utilization = Number(req.params.cpu_utilization) || 25;
  const cpuLoad = Math.max(0, Math.min(cpu_utilization / 100, 1));

  console.log(`[CPU] Start with ~${cpu_utilization}% load per core`);

  const cpuStart = process.cpuUsage();
  const durationMs = 10_000;
  const cpuCount = os.cpus().length;
  const workers = [];

  const workerCode = `
    const { parentPort, workerData } = require('node:worker_threads');

    const duration = workerData.duration;
    const cpuLoad = workerData.cpuLoad;
    const burnInterval = 100;

    const endTime = Date.now() + duration;

    function burnCpu() {
      const now = Date.now();
      if (now >= endTime) {
        parentPort.postMessage('done');
        return;
      }

      const burnTime = burnInterval * cpuLoad;
      const sleepTime = burnInterval - burnTime;

      const start = Date.now();
      while (Date.now() - start < burnTime) {
        Math.sqrt(Math.random());
      }

      setTimeout(burnCpu, sleepTime);
    }

    burnCpu();
  `;

  return new Promise((resolve) => {
    let completed = 0;

    for (let i = 0; i < cpuCount; i++) {
      const worker = new Worker(workerCode, {
        eval: true,
        workerData: {
          duration: durationMs,
          cpuLoad: cpuLoad,
        },
      });

      worker.on('message', () => {
        completed++;
        if (completed === cpuCount) {
          console.log('[CPU] End');
          logCpuUsage('CPU - Total', cpuStart);
          res.status(200).json({ message: 'CPU stress done' });
          resolve();
        }
      });

      workers.push(worker);
    }
  });
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
