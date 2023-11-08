const { createProxyMiddleware } = require("http-proxy-middleware");


const PORT = process.env.REACT_APP_PORT_NUMBER;

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