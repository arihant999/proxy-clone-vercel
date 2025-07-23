const https = require('https');

module.exports = (req, res) => {
    const url = 'https://studyuk.fun/goal/' + req.url;

    https.get(url, (response) => {
        let data = '';

        // Collect data chunks
        response.on('data', chunk => {
            data += chunk;
        });

        // On end of response, modify and send the data
        response.on('end', () => {
            // Replace the Telegram link
            data = data.replace(/https:\/\/t.me\/[^\s"]+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');
            res.writeHead(response.statusCode, {
                'Content-Type': response.headers['content-type'],
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*', // Allow CORS
            });
            res.end(data);
        });
    }).on('error', (err) => {
        console.error(err);
        res.status(500).send('Error: ' + err.message);
    });
};
