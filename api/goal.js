
export default async function handler(req, res) {
  const targetUrl = "https://studyuk.fun/goal/";

  const response = await fetch(targetUrl, {
    headers: {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
    },
  });

  let text = await response.text();

  // Replace Telegram links
  text = text.replace(/https:\/\/t\.me\/[\w\-\+]+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(text);
}
