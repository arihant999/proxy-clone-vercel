export default async function handler(req, res) {
  try {
    const response = await fetch('https://studyuk.fun/goal/', {
      headers: { 'User-Agent': req.headers['user-agent'] || '' }
    });
    const buffer = await response.arrayBuffer();
    const html = new TextDecoder('utf-8').decode(buffer);

    // Remove all <script> tags to avoid atob error
    let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Replace Telegram links with your custom one
    clean = clean.replace(/https:\/\/t\.me\/[^\s"'<>]+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');

    // ✅ Correct hyphen here
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    res.status(200).end(clean);
  } catch (e) {
    res.status(500).end('Proxy error: ' + e.message);
  }
}
