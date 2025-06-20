const http = require('http');

async function getMetadataV4(path) {
  const options = {
    hostname: '169.254.170.2',
    path,
    timeout: 1000,
  };

  return new Promise((resolve) => {
    http
      .get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', (err) => {
        console.warn('Failed to get ECS metadata', err);
        resolve({});
      });
  });
}

async function getInstanceIdentity(req, res) {
  const metadata = await getMetadataV4('/v4/task');

  const id = metadata.TaskARN?.split('/').pop() || 'unknown';
  const ip = metadata.Containers?.[0]?.Networks?.[0]?.IPv4Addresses?.[0] || 'unknown';

  res.json({ id, ip });
}

module.exports = { getInstanceIdentity };
