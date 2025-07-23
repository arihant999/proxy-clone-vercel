export default async function handler(req, res) {
  try {
    const response = await fetch('https://studyuk.fun/goal/', {
      headers: {
        'User-Agent': req.headers['user-agent'] || ''
      }
    });

    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder('utf-8');
    let html = decoder.decode(buffer);

    // Replace all Telegram links with your channel link
    html = html.replace(/https:\/\/t\.me\/[^\s"'<>]+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).end(html);
  } catch (error) {
    res.status(500).end("Proxy Error: " + error.message);
  }
}
