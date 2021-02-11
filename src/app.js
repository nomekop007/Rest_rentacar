require("dotenv").config();
require("./config/database/db");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
class app {

    // MODIFICAR!!

    constructor({ server, router, logMiddleware, }) {
        this._server = server;
        this.express = express();
        this.express.use(cors(process.env.LIST_CORS));
        this.express.use(compression());
        this.express.use(helmet());
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.json({ limit: "400mb", extended: true }));
        this.express.use(bodyParser.urlencoded({ limit: "400mb", extended: true }));
        //static files (hace publica la carpeta uploads)
        this.express.use(express.static(path.join("uploads/fotoDespachos")));
        // ruta padre
        this.express.use("/rentacar", router, logMiddleware.logRegister);
    }

    start() {
        switch (process.env.NODE_ENV) {
            case 'production':
                this._server.startProd(this.express)
                break;
            default:
                this._server.startDev(this.express)
                break;
        }
    }

}


module.exports = app;