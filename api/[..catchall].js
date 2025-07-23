import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://studyuk.fun',
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyRes: async (proxyRes, req, res) => {
    let body = Buffer.from([]);

    proxyRes.on('data', chunk => body = Buffer.concat([body, chunk]));
    proxyRes.on('end', () => {
      let html = body.toString('utf-8');

      // Replace Telegram links
      html = html.replace(/https:\/\/t\.me\/[^\s"'<>]+/g, 'https://t.me/+rc5Psv_S2VJkMGM1');

      res.setHeader('content-type', proxyRes.headers['content-type'] || 'text/html');
      res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate');
      res.write(html);
      res.end();
    });
  },
  pathRewrite: {
    '^/': '/',  // Proxy anything
  },
});
