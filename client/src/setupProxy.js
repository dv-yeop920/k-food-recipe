const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = "http://localhost:7070";

module.exports = function(app) {
    app.use(
        "/api",
        createProxyMiddleware({
        target: PORT,
        changeOrigin: true,
        })
    );
};