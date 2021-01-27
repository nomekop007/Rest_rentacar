const https = require("https");
const fs = require("fs");
const app = require("./app");

if (app.get('env') == "production") {
    const cert = fs.readFileSync("./cert4.pem");
    const key = fs.readFileSync("./privkey4.pem");
    const server = https
        .createServer({ cert: cert, key: key }, app)
        .listen(app.get('port'), () => {
            const { port } = server.address();
            console.log("Servidor arrancado! https production Puerto ", port);
        });
} else {
    const server = app.listen(app.get('port'), () => {
        const { port } = server.address();
        console.log("Servidor arrancado! http development Puerto ", port);
    });
}

module.exports = app;