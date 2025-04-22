const http = require('http');

async function getInstanceMeta(key) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '169.254.169.254',
      path: `/latest/meta-data/${key}`,
      timeout: 1000,
    };

    http
      .get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', (err) => {
        console.error(`[Meta] Failed to get ${key}:`, err);
        resolve('unknown');
      });
  });
}

async function getInstanceIdentity(req, res) {
  const id = await getInstanceMeta('instance-id');
  const ip = await getInstanceMeta('local-ipv4');
  res.json({ id, ip });
}

module.exports = { getInstanceIdentity };
