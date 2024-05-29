module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:6000',
        changeOrigin: true,
      })
    );
  };