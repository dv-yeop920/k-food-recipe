const { createProxyMiddleware } = require("http-proxy-middleware");



const PORT = "http://localhost:7070";

module.exports = function(app) {
    try {
            app.use(
                "/api",
                createProxyMiddleware({

                    target: PORT ,
                    changeOrigin: true

                })
            );
    }
    catch (error) {
        console.log(error.message);
    }
}