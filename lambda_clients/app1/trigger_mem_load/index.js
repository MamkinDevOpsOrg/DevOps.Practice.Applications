const http = require('http');

exports.handler = async () => {
  const url = `${process.env.TARGET_URL}/10`;

  console.log(`Lambda triggered: ${url}`);

  for (let i = 0; i < 5; i++) {
    console.log(`[${i + 1}/6] Sending request to ${url}`);

    await new Promise((resolve) => {
      const options = {
        headers: {
          'User-Agent': 'lambda-probe/1.0', // TODO: temp solution to filter requests in logs insights
        },
      };

      http
        .get(url, options, (res) => {
          console.log(`→ ${url} status: ${res.statusCode}`);
          resolve();
        })
        .on('error', (err) => {
          console.error(`❌ Error: ${err.message}`);
          resolve();
        });
    });
  }

  console.log('✅ Done with 6 requests');
  return { statusCode: 200, body: 'Completed 6 requests every 10 seconds' };
};
