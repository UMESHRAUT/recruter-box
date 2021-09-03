const { createProxyMiddleware } = require('http-proxy-middleware');

const middleware = (app) => {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://localhost:8020/',
      changeOrigin: true,
    })
  );
};
module.exports = middleware;
