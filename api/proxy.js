export default async function handler(req, res) {
  try {
    const response = await fetch('https://studyuk.fun/goal/');
    let html = await response.text();

    // Replace all Telegram links with your custom channel link
    html = html.replace(/https:\/\/t\.me\/[^\s"'<>]+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).end(html);
  } catch (error) {
    res.status(500).end("Something went wrong: " + error.message);
  }
}
