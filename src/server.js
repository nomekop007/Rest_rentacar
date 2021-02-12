const express = require('express');
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");

class server {

    constructor({ config, router }) {
        this.config = config;
        this.https = https;
        this._express = express();
        this._express.use(compression());
        this._express.use(helmet());
        this._express.use(morgan("dev"));
        this._express.use(cors(process.env.LIST_CORS))
        this._express.use(bodyParser.json({ limit: "400mb", extended: true }))
        this._express.use(bodyParser.urlencoded({ limit: "400mb", extended: true }))
        this._express.use(express.static(path.join("uploads/fotoDespachos")));
        this._express.use(router);
    }

    startProd() {
        return new Promise((resolve, reject) => {
            const cert = fs.readFileSync("./cert4.pem");
            const key = fs.readFileSync("./privkey4.pem");
            const server = this.https.createServer({ cert: cert, key: key }, this._express)
                .listen(this.config.PORT, () => {
                    const { port } = server.address();
                    console.log("Servidor arrancado! https production Puerto ", port);
                    resolve();
                });
        })
    }

    startDev() {
        return new Promise((resolve, reject) => {
            const server = this._express.listen(this.config.PORT, () => {
                const { port } = server.address();
                console.log("Servidor arrancado! http development Puerto ", port);
                resolve();
            });
        });
    }

}

module.exports = server;