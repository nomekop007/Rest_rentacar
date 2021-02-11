const https = require("https");
const fs = require("fs");
class server {

    constructor({ config }) {
        this.config = config;
        this.https = https;
    }

    startProd(express) {
        const cert = fs.readFileSync("./cert4.pem");
        const key = fs.readFileSync("./privkey4.pem");
        const server = https.createServer({ cert: cert, key: key }, this.config.PORT)
            .listen(express.get('port'), () => {
                const { port } = server.address();
                console.log("Servidor arrancado! https production Puerto ", port);
            });
    }

    startDev(express) {
        const server = express.listen(this.config.PORT, () => {
            const { port } = server.address();
            console.log("Servidor arrancado! http development Puerto ", port);
        });
    }

}

module.exports = server;