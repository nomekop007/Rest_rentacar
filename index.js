//variables de entorno
require("dotenv").config();

require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");
const morgan = require("morgan");
const path = require("path");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//static files (hace publica la carpeta uploads)
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/rentacar", apiRouter);

//start server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV == "production") {
    const cert = fs.readFileSync("./cert4.pem");
    const key = fs.readFileSync("./privkey4.pem");
    const c = [process.env.ORIGEN, process.env.LOCAL];
    app.use(cors(c));
    https.createServer({ cert: cert, key: key }, app).listen(PORT, () => {
        console.log("Servidor arrancado! https production Puerto ", PORT);
    });
} else {
    app.listen(PORT, () => {
        console.log("Servidor arrancado! http development Puerto ", PORT);
    });
}