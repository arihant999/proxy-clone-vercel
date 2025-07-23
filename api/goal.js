
export default async function handler(req, res) {
  const response = await fetch("https://studyuk.fun/goal", {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  let html = await response.text();

  // Replace StudyUK branding with your Telegram links
  html = html
    .replace(/https:\/\/t\.me\/[^"']+/g, "https://t.me/+rc5Psv_S2VJkMGM1")
    .replace(/@StudyUK[^"'<]*/gi, "@MockManager")
    .replace(/StudyUK\.fun/gi, "NAKODA BHAIRAV");

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
