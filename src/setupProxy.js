// eslint-disable-next-line
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/graphql', '/rest'],
    createProxyMiddleware({
      target: process.env.API_URL,
      changeOrigin: true,
    })
  );
};
