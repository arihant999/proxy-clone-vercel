// This is your Vercel Serverless Function

export default async function handler(req, res) {
  const targetUrl = "https://studyuk.fun/goal/";

  try {
    const response = await fetch(targetUrl);
    let html = await response.text();

    // Replace original Telegram links with yours
    html = html.replace(/https:\/\/t\.me\/[^"']+/g, "https://t.me/+rc5Psv_S2VJkMGM1");

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-cache");

    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).send("Proxy Failed: " + err.message);
  }
}
