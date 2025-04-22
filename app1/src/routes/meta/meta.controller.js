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
      .on('error', reject);
  });
}

async function getInstanceIdentity() {
  const id = await getInstanceMeta('instance-id');
  const ip = await getInstanceMeta('local-ipv4');
  return { id, ip };
}

module.exports = { getInstanceIdentity };
