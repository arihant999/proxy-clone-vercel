export default async function handler(req, res) {
  const response = await fetch('https://studyuk.fun/goal/');
  let html = await response.text();

  // Replace Telegram links
  html = html.replace(/https:\/\/t\.me\/[^\s"']+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');

  // Fix encoding (avoid atob errors)
  html = html.replace(/charset=[^";']+/g, 'charset=UTF-8');

  // Optionally remove all <script> tags if needed:
  // html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).end(html);
}
