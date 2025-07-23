export default async function handler(req, res) {
  const response = await fetch('https://studyuk.fun/goal/');
  let html = await response.text();

  html = html.replace(/https:\/\/t\.me\/[^\s"']+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).end(html);
}
