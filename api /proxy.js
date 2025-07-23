const { createProxyMiddleware } = require('http-proxy-middleware');
const { parse, serialize } = require('parse5');

module.exports = async (req, res) => {
  // Proxy configuration
  const proxy = createProxyMiddleware({
    target: 'https://studyuk.fun',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy': '' }, // Rewrite /api/proxy to root
    onProxyRes: (proxyRes, req, res) => {
      // Modify headers to bypass CSP and X-Frame-Options
      delete proxyRes.headers['content-security-policy'];
      delete proxyRes.headers['x-frame-options'];
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';

      // Handle HTML content for link replacement
      let body = '';
      proxyRes.on('data', (chunk) => {
        body += chunk.toString();
      });
      proxyRes.on('end', () => {
        if (proxyRes.headers['content-type']?.includes('text/html')) {
          // Parse HTML
          const document = parse(body);
          // Function to traverse and replace Telegram link
          const traverse = (node) => {
            if (node.tagName === 'a' && node.attrs) {
              const hrefAttr = node.attrs.find((attr) => attr.name === 'href');
              if (hrefAttr && hrefAttr.value.includes('t.me')) {
                hrefAttr.value = 'https://t.me/+rc5Psv_S2VJkMGM1';
              }
            }
            if (node.childNodes) {
              node.childNodes.forEach(traverse);
            }
          };
          traverse(document);
          // Serialize modified HTML
          body = serialize(document);
        }
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(body);
      });
    },
  });

  // Handle proxy errors
  proxy(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Proxy error occurred');
    }
  });
};
