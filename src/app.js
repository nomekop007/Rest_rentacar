require("dotenv").config();
require("./database/db");
const log = require("./middlewares/log.middleware");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV);
app.use(cors(process.env.LIST_CORS));
app.use(compression());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "400mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "400mb", extended: true }));
//static files (hace publica la carpeta uploads)

app.use(express.static(path.join("uploads/fotoDespachos")));
// ruta padre
app.use("/rentacar", apiRouter, log.logRegister);

module.exports = app;
