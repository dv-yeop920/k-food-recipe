const proxy = require("http-proxy-middleware");

const PORT = "http://localhost:7070";

module.exports = function(app) {
    try {
        app.use(
            "/api",
            proxy({
                target: PORT,
                changeOrigin: true
            })
        );
    }
    catch(err){
        console.log(err.message);
    }
}

/*const openApi = "http://openapi.foodsafetykorea.go.kr";

module.exports = function(app) {
    app.use(
        "/api",
        createProxyMiddleware({
        target: openApi,
        changeOrigin: true,
        })
    );
};*/