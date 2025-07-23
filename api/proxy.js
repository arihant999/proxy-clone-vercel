export default async function handler(req, res) {
  try {
    const upstream = await fetch('https://studyuk.fun/goal/', {
      headers: { 'User-Agent': req.headers['user-agent'] || '' }
    });
    
    const buffer = await upstream.arrayBuffer();
    let html = new TextDecoder('utf-8').decode(buffer);
    
    // Remove scripts to prevent atob() errors
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Replace original Telegram links
    html = html.replace(/https:\/\/t\.me\/[^\s"']+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).end(html);
  } catch (err) {
    res.status(500).end('Proxy error: ' + err.message);
  }
}
