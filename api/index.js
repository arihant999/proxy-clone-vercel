export default function handler(req, res) {
  res.writeHead(302, { Location: '/api/proxy' });
  res.end();
}
