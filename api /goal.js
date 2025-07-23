export default async function handler(req, res) {
  const response = await fetch("https://studyuk.fun/goal", {
    headers: {
      "User-Agent": req.headers["user-agent"] || "",
    },
  });

  let html = await response.text();

  // Replace Telegram link in HTML with yours
  html = html.replace(
    /https:\/\/t\.me\/[^\s"'<>]+/g,
    "https://t.me/+rc5Psv_S2VJkMGM1"
  );

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
