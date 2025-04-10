// --- Helpers for formatting memory and CPU ---
function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function logMemoryUsage(label) {
  const mem = process.memoryUsage();
  console.log(`[${label}] Memory usage:`, {
    rss: formatBytes(mem.rss),
    heapTotal: formatBytes(mem.heapTotal),
    heapUsed: formatBytes(mem.heapUsed),
    external: formatBytes(mem.external),
    arrayBuffers: formatBytes(mem.arrayBuffers),
  });
}

function logCpuUsage(label, startCpu) {
  const current = process.cpuUsage(startCpu);
  console.log(`[${label}] CPU usage:`, {
    user: `${(current.user / 1000).toFixed(2)} ms`,
    system: `${(current.system / 1000).toFixed(2)} ms`,
  });
}

module.exports = {
  logMemoryUsage,
  logCpuUsage,
};
